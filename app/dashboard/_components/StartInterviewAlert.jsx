"use client"
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

const StartInterviewAlert = ({text, interviewId}) => {
    const router = useRouter()

    function handleContinue() {
        const element = document.documentElement // <html> element

        if (element.requestFullscreen) {
            element.requestFullscreen()
        } else if (element.webkitRequestFullscreen) { // Safari
            element.webkitRequestFullscreen()
        } else if (element.msRequestFullscreen) { // Older Edge
            element.msRequestFullscreen()
        }

        // After requesting fullscreen, redirect immediately
        router.push(`/dashboard/interview/${interviewId}/start`)
    }

    return (
        <div>
            <AlertDialog>
            <AlertDialogTrigger className='bg-indigo-700 hover:bg-indigo-600 hover:cursor-pointer text-white px-3 py-1.5 rounded-lg flex gap-1 flex-row items-center shadow-md hover:shadow-lg transition-shadow duration-300'> 
                {text}
                <ArrowRight className='h-4 w-5'/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Do you want to proceed and start the interview now?</AlertDialogTitle>
                <AlertDialogDescription className=''>
                    Once you click continue, the screen will enter full-screen mode and interview will begin immediately.
                    You have to answer each and every question to proceed to the next one. If you don’t know an answer, you can simply respond with “I don’t know”<br/>
                    Please ensure you are in a quiet environment and prepared before continuing.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel className='hover:cursor-pointer'>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                    onClick={handleContinue}
                    className='hover:cursor-pointer'
                >
                    Continue
                    <ArrowRight className='h-5 w-5'/>
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default StartInterviewAlert