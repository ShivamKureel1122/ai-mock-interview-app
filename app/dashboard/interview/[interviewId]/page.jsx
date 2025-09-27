"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { Lightbulb, Mic, Video, VideoOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Webcam from "react-webcam";
import { useStore } from '@/store/useStore'
import StartInterviewAlert from '../../_components/StartInterviewAlert'


const Interview = ({ params }) => {
  const { interviewDetails, getInterviewDetails, } = useStore()
  const [enabled, setEnabled] = useState(false)
  const { interviewId } = params

  useEffect(() => {
    async function fetchData() {
      try {
        // console.log('Interview id: ', interviewId)
        if(!interviewDetails) {
          await getInterviewDetails(interviewId)
        }
      } catch (error) {
        console.log('Error occurred in fetchData function: ', error.message)
      }
    }

    fetchData()
  }, [params])

  return (
    <div className='pb-6'>
      <div className='mb-6'>
        <h2 className='text-3xl font-bold'>Let's Get Started</h2>
      </div>

      <div className='rounded-xl bg-yellow-50 p-5'>
        <h2 className='flex flex-row mb-2 text-yellow-600'>
          <Lightbulb className='h-5 w-5 mr-1'/>
          <strong>Information</strong>
        </h2>
        <h2 className='text-yellow-600 ml-2'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
        <h2 className='text-yellow-600 ml-2'>{process.env.NEXT_PUBLIC_NOTE}</h2>
      </div> 

      <div className='flex-1 flex flex-col gap-2 border py-6 px-8 rounded-xl shadow-xl mt-10'>
        <h2 className='text-2xl font-bold'>
          {interviewDetails?.jobRole}
        </h2>
        <h2>
          <span className='font-semibold mr-1'>Job Description:</span>
          <span className='text-gray-600'>{interviewDetails?.jobDes}</span>
        </h2>
        <h2>
          <span className='font-semibold mr-1'>Years of Experience:</span>
          <span className='text-gray-600'>{interviewDetails?.experience}</span>
        </h2>
        <div className='flex flex-row gap-5 items-center'>
          <h2 className='font-semibold'>Skills: </h2>
          { interviewDetails?.skills.split(', ').map((skill, index) => (
              <div 
              key={index}
              className='border rounded-md px-2'
              >{skill}</div>
          )) }
        </div>
      </div> 

      <div className='flex justify-center mt-12'>
        <div className="w-xl bg-white rounded-2xl shadow-xl p-4 flex flex-col items-center border">
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

          <div className='flex justify-center gap-5 mt-3'>
            <Button
            variant={"outline"}
            disabled={true}
            >
              <Mic className='h-6 w-7'/>
              Start Recording
            </Button>

            <Button
            className='cursor-pointer'
            onClick={() => setEnabled(!enabled)}
            variant={!enabled ? 'outline' : 'destructive'}
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

      <div className='flex justify-end mt-8 mr-8'>
        {/* <Button 
          onClick={() => router.push(`/dashboard/interview/${interviewId}/start`)}
          className='bg-indigo-700 hover:bg-indigo-600 hover:cursor-pointer'
        >
          Start Interview
          <ArrowRight className='h-5 w-5'/>
        </Button> */}
        <StartInterviewAlert text="Start Interview" interviewId={interviewId}/> 
      </div>
    </div>
  )
}

export default Interview
