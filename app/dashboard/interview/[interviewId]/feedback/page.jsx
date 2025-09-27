"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, CircleAlert, Lightbulb, CircleCheck, ArrowRight, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const FeedbackPage = ({ params }) => {
    const [overallRating, setOverallRating] = useState(null)
    const [feedbackData, setFeedbackData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [collapse, setCollapse] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const router = useRouter()

    useEffect(() => {
        async function getFeedback() {
            const { interviewId } = params

            try {
                const response = await axios.get('/api/user-answer', {
                    params: { interviewId }
                })
                // console.log('feedback response: ', response?.data?.feedback)

                setFeedbackData(response?.data?.feedback)
            } catch (error) {
                console.log('Error occured in getFeedback function: ', error.message)
                throw new Error('Error fetching feedback details')
            }
        }

        getFeedback()
    }, [])


    useEffect(() => {
        async function calculateOverallRating() {
            try {
                setLoading(true)
                // await getFeedback()

                const totalRating = feedbackData.reduce((sum, item) => sum + item.rating, 0)
                setOverallRating(totalRating / process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT)

                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log('Error occured: ', error.message)
            }
        }

        calculateOverallRating()
    }, [feedbackData])

    return (
        <div>
            <h2 className='font-bold text-green-500 text-3xl mb-4'>Congratulations!</h2>
            <h2 className='font-semibold text-indigo-700 text-lg'>Your overall rating is: {overallRating}/5</h2>
            <h2 className='text-gray-600 font-semibold mb-3'>Great job completing the mock interview! Below you’ll find a summary of your responses and insights to help you improve further. Reviewing these will give you clarity on your approach and areas to refine.</h2>

            { feedbackData && feedbackData.map((item, index) => (
                <Collapsible 
                    key={index}
                    className='my-5'
                >
                    <div className='flex flex-row border rounded-xl w-full shadow-lg px-6 py-5 gap-6 justify-between'>
                        <CollapsibleTrigger 
                        className='text-left cursor-pointer'
                        onClick={() => {
                            setCollapse(!collapse)
                            setActiveIndex(index)
                        }}
                        >
                            {item.question}
                        </CollapsibleTrigger>
                        <div className='flex justify-center items-center'>
                            {
                                collapse && (activeIndex === index) ? (
                                    <ChevronUp 
                                    className='h-6 w-6 text-gray-500'/>
                                ) : (
                                    <ChevronDown className='h-6 w-6 text-gray-500'/>
                                )
                            }
                        </div>
                    </div>
                    
                    <CollapsibleContent className='px-6 py-4'>
                        <h2 className='text-indigo-700 font-semibold mb-2'>Rating: {item.rating}/5</h2>
                        <div className="flex flex-col gap-1 rounded-xl p-4 bg-red-50 text-red-800 mb-2">
                            <div className='flex items-center'>
                                <CircleAlert className='h-5 w-5 mr-2'/>
                                <h2 className='font-semibold text-red-800 mr-2'>Your Answer: </h2>
                            </div>
                            <h2 className='pl-7'>{item.userAns}</h2>
                        </div>

                        <div class="flex flex-col gap-1 rounded-xl p-4 bg-green-100 text-green-800 mb-2">
                            <div className='flex items-center'>
                                <CircleCheck className='h-5 w-5 mr-2'/>
                                <h2 className='font-semibold text-green-800 mr-2'>Correct Answer: </h2>
                            </div>
                            <h2 className='pl-7'>{item.correctAns}</h2>
                        </div>
                        
                         <div class="flex flex-col gap-1 rounded-xl p-4 bg-blue-100 text-blue-800 mb-2">
                            <div className='flex items-center'>
                                <Lightbulb className='h-5 w-5 mr-2'/>
                                <h2 className='font-semibold text-blue-800 mr-2'>Feedback: </h2>
                            </div>
                            <h2 className='pl-7'>{item.feedback}</h2>
                         </div>
                        
                    </CollapsibleContent>
                </Collapsible>
            ))}

            <h2 className='my-3 text-md text-gray-800 font-semibold'>Thank you for participating! Click below to return to the dashboard and continue your learning path.</h2>

            <Button 
                variant={'default'}
                disabled={loading}
                className='hover:cursor-pointer'
                onClick={() => {
                    setLoading(true)
                    router.replace('/dashboard')
                    setLoading(false)
                }}
            >
                {
                    !loading ? (
                        <>
                            Go to Dashboard
                            <ArrowRight className='h-5 w-5'/>
                        </>
                    ) : (
                        <>
                            <LoaderCircle className='animate-spin'/>
                            Redirecting...
                        </>
                    )
                }
            </Button>
        </div>
    )
}

export default FeedbackPage
