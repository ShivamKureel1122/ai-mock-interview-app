"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import geminiAPI from "@/lib/geminiAPI"
import { LoaderCircle, ArrowRight } from "lucide-react"
import axios from "axios"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const AddInterview = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobRole, setJobRole] = useState("")
    const [jobDes, setJobDes] = useState("")
    const [experience, setExperience] = useState()
    const [loading, setLoading] = useState(false)
    const [skills, setSkills] = useState('')

    const { user } = useUser()
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            // console.log(jobRole, jobDes, experience, skills)

            const prompt = `Job Role: ${jobRole}, Job Description: ${jobDes}, Skills: ${skills}, Years of Experience: ${experience}. Based on the information provided generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT} interview questions along with their answers in json format. The response should not contain any special or invalid characters in json and it should be an array containing objects with question and answer fields.`

            const res = await geminiAPI(prompt)

            if(!res) {
                throw('Error generating gemini response')
            }

            const aiResponse = res.text.replace('```json', '').replace('```', '')
            // console.log(aiResponse)

            const email = user.primaryEmailAddress?.emailAddress
            const response = await axios.post('/api/interview', {
                jobRole,
                jobDes,
                experience,
                aiResponse,
                email,
                skills,
            })
            // console.log(response.data)
            setLoading(false)
            
            if(response) {
                setOpenDialog(false)
                router.push(`/dashboard/interview/${response.data.id}`)
            }

        } catch (error) {
            setLoading(false)
            console.log('Error occurred: ', error.message)
            toast.error(`Error occurred: ${error.message}`)
        }
    }

    return (
        <div>
            <div 
                className='px-26 py-15 bg-secondary border cursor-pointer hover:scale-105 hover:shadow-md rounded-lg transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-center'>+ Add New</h2>
            </div>
        
            <Dialog open={openDialog}>
            <DialogContent className="lg:max-w-2xl">
                <DialogHeader>
                <DialogTitle className='text-2xl text-gray-900 font-bold'>
                    Tell us more about Job you are Interviewing
                </DialogTitle>
                <DialogDescription asChild>
                    <form onSubmit={onSubmit}>
                        <h3 className="text-gray-600 text-md">Add details about Job Role, Job Description, Skills and Years of experience</h3>

                        <div>
                            <div className="py-2 mt-2">
                                <label>Job Role:</label>
                                <Input 
                                    placeholder="Ex. Full Stack Developer" 
                                    required
                                    onChange={(e) => setJobRole(e.target.value)}
                                />
                            </div>
                            <div className="py-2">
                                <label>Job Description:</label>
                                <Textarea 
                                    placeholder='Ex. Job Description' 
                                    required
                                    onChange={(e) => setJobDes(e.target.value)}
                                />
                            </div>
                            <div className="py-2">
                                <label>Skills:</label>
                                <Textarea 
                                    placeholder='Ex. React, MongoDB, Node.js etc.' 
                                    onChange={(e) => setSkills(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="py-2">
                                <label>Years of Experience:</label>
                                <Input 
                                    placeholder='Ex. 5' 
                                    type='number' 
                                    required 
                                    max="50"
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end mt-2">
                            <Button 
                            type="submit" 
                            variant="ghost" 
                            className='hover:cursor-pointer' 
                            onClick={() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            <Button 
                            type="submit" 
                            className='bg-indigo-700 hover:bg-indigo-600 hover:cursor-pointer'
                            disabled={loading}>
                                { loading 
                                    ?   <>
                                            <LoaderCircle className="animate-spin"/>
                                            Generating from AI
                                        </>
                                    : <>
                                        Start Interview
                                        <ArrowRight className='h-5 w-5'/>
                                    </>
                                }
                            </Button>
                        </div>
                    </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddInterview