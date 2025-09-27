"use client"
import { useEffect, useState } from 'react'
import { useStore } from '@/store/useStore'
import Webcam from 'react-webcam'
import QuestionsSection from './_components/QuestionsSection'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, CircleStop, Video, VideoOff, ArrowLeft, ArrowRight, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import geminiAPI from '@/lib/geminiAPI'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const StartInterview = ({params}) => {
    const { interviewDetails, getInterviewDetails } = useStore()
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [enabled,setEnabled] = useState(false)
    const [userAnswer, setUserAnswer] = useState('')
    const [loading, setLoading] = useState(false)
    const [enableButton, setEnableButton] = useState(Array(5).fill(false))
    const router = useRouter()

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        async function fetchData() {
          try {
            const { interviewId } = params
            // console.log('Interview id: ', interviewId)
    
            if(!interviewDetails) {
                // console.log('interviewDetails is null')
                await getInterviewDetails(interviewId)
            }
          } catch (error) {
            console.log('Error occurred in fetchData function: ', error.message)
          }
        }
    
        fetchData()
    }, [params])

    useEffect(() => {
        const jsonInterviewQuestions = interviewDetails?.mockResp ? JSON.parse(interviewDetails?.mockResp) : []
        // console.log('Parsed interview questions: ', jsonInterviewQuestions)
        setMockInterviewQuestions(jsonInterviewQuestions)
    }, [interviewDetails])

    useEffect(() => {
        results.map((result) => (
            setUserAnswer(prevAns => prevAns + result?.transcript)
        ))
    }, [results])

    const saveUserAnswer = async () => {
        try {
            setLoading(true)

            if(isRecording) {
                stopSpeechToText()

                if(userAnswer.length < 10) {
                    setLoading(false)
                    toast('Error while saving your answer, please record again')
                    return
                }

                const feedbackPrompt = `Question: ${mockInterviewQuestions[activeIndex]?.question}, Answer: ${userAnswer}, Depends on user answer for the given interview question please give us rating for the answer on a scale of 5 and feedback as area of improvement if any in just 3 to 5 lines in JSON format with rating and feedback field.`

                const res = await geminiAPI(feedbackPrompt)
                if(!res) {
                    throw('Error generating gemini response')
                }

                const geminiResponse = res.text.replace('```json', '').replace('```', '')
                // console.log('Gemini feedback: ', geminiResponse)
                
                const jsonFeedbackResponse = JSON.parse(geminiResponse)
                // console.log('JSON feedback response: ', jsonFeedbackResponse)

                const response = await axios.post('/api/user-answer', {
                    interviewId: interviewDetails._id,
                    question: mockInterviewQuestions[activeIndex]?.question,
                    userAns: userAnswer,
                    correctAns: mockInterviewQuestions[activeIndex]?.answer,
                    rating: jsonFeedbackResponse.rating,
                    feedback: jsonFeedbackResponse.feedback,
                })

                if(response) {
                    toast('Your answer is recorded and saved successfully')
                    setEnableButton(prev => {
                        const newEnableButton = [...prev]
                        newEnableButton[activeIndex] = true
                        return newEnableButton
                    })
                }

                setResults([])
                setUserAnswer('')
            } else {
                startSpeechToText()
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('Error occurred while saving user answer: ', error)
            toast.error('Error occurred while saving your answer, please try again.')
        }
    }


    const handleClick = async () => {
        try {
            setLoading(true)
            await axios.post('/api/interview/completed', {
                interviewId: interviewDetails._id
            })
            router.push(`/dashboard/interview/${interviewDetails._id}/feedback`)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('Error occurred while marking interview as completed: ', error)
            toast.error('Error occurred while marking interview as completed. Please try again.')
        }
    }

    return interviewDetails && (
        <div>
            <div className='border rounded-xl flex flex-row'> 
                <div className='flex-1/2 flex justify-between flex-col'>
                    <QuestionsSection  
                        mockInterviewQuestions={mockInterviewQuestions}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />

                    <div className='flex justify-end gap-5 px-6 py-6'>
                        {activeIndex > 0 && 
                            <Button
                            onClick={() => setActiveIndex(activeIndex - 1)}
                            variant={'outline'}
                            className='hover:cursor-pointer'
                            >
                                <ArrowLeft className='h-5 w-5'/>
                                Previous
                            </Button>
                        }
                        {activeIndex !== mockInterviewQuestions?.length - 1 && 
                            <Button
                            onClick={() => setActiveIndex(activeIndex + 1)}
                            className='hover:cursor-pointer'
                            disabled={!enableButton[activeIndex]}
                            >
                                Next
                                <ArrowRight className='h-5 w-5'/>
                            </Button>
                        }
                        {activeIndex === mockInterviewQuestions?.length - 1 && 
                            <Button
                            className='hover:cursor-pointer'
                            disabled={!enableButton[activeIndex] || loading}
                            onClick={handleClick}
                            >
                                {
                                    loading ? (
                                        <>
                                            Get Feedback
                                            <ArrowRight className='h-5 w-5'/>
                                        </>
                                    ) : (
                                        <>
                                            <LoaderCircle className="animate-spin"/>
                                            Redirecting..
                                        </>
                                    )
                                }
                            </Button>
                        }
                    </div>
                </div>

                <div className='flex-1/2 flex justify-center items-center py-8'>
                    <div className="w-lg bg-white rounded-2xl shadow-xl p-4 flex flex-col items-center border">
                        {/* <h2 className="text-xl font-semibold mb-4">Camera Preview</h2> */}
                        <div className="relative w-full h-90 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
                        {enabled ? (
                            <Webcam
                            className="w-full h-full object-cover"
                            onUserMedia={() => setEnabled(true)}
                            onUserMediaError={() => setEnabled(false)}
                            mirrored={true}
                            videoConstraints={{
                                facingMode: "user",
                            }}
                            />
                        ) : (
                            <>
                            <span className="text-gray-500">Camera Disabled</span>
                            </>
                        )}
                        </div>
            
                        <div className='flex justify-center gap-4 pt-4'>
                            <Button
                                onClick={saveUserAnswer}
                                variant={!isRecording ? "outline" : 'destructive'}
                                disabled={enableButton[activeIndex] || loading}
                                className='cursor-pointer'
                            >
                                {!loading 
                                    ? (
                                        isRecording ? (
                                            <>
                                            <CircleStop className='h-5 w-5'/>
                                            Stop Recording
                                            </>
                                        ) : (
                                            <>
                                            <Mic className='h-5 w-5'/>
                                            Start Recording
                                            </>
                                        )
                                    ) 
                                    : (
                                        <>
                                            <LoaderCircle className="animate-spin"/>
                                            Saving...
                                        </>
                                    )}
                            </Button>

                            <Button
                            onClick={() => setEnabled(!enabled)}
                            variant={enabled ? 'destructive' : "outline"}
                            className='cursor-pointer'
                            >
                            {enabled ? (
                                <>
                                <VideoOff className='h-6 w-7'/>
                                Disable Webcam
                                </>
                            ) : (
                            <>
                                <Video className='h-6 w-7'/>
                                Enable Webcam
                            </>
                            )}
                            </Button>

                        </div>
                    </div>
                </div>           
            </div>
            <div className='flex rounded-xl shadow-lg border px-6 py-4 mt-6 bg-gray-50'>
                <div>
                    <h2 className='font-semibold text-gray-900'>Your Answer:</h2>
                    {!userAnswer && (
                        !enableButton[activeIndex] 
                        ? <h2 className='text-gray-600'>Click on Start Recording button to start recording your answer.</h2>
                        : <h2 className='text-green-600'>You have answered this question.</h2>
                    )}
                    <ul>
                        {results.map((result) => (
                        <li key={result.timestamp}>{result.transcript}</li>
                        ))}
                        {interimResult && <li>{interimResult}</li>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default StartInterview