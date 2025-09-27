import React from 'react'
import Header from '../_components/Header'
import { Dot, TriangleAlert, } from 'lucide-react'

const WorkingInfo = () => {
  return (
    <div>
        <Header/>
        <div className='mx-4 md:mx-28 lg:mx-36 py-12 px-8'>
            <div className='text-gray-800 font-bold text-2xl mb-6 border-b py-4 pl-2'>How it Works?</div>
            
            <div className='ml-7'>
                <div className='text-gray-800 mb-6'>
                    <h2 className='font-semibold'>1. Create Your Interview</h2>
                    <div className='ml-7 my-1'>
                        <h2>Enter the details of the job you're preparing for:</h2>
                        <h2><span className='font-bold text-gray-700'>• Job Role</span> – what position you're targeting</h2>
                        <h2><span className='font-bold text-gray-700'>• Description</span> – responsibilities and expectations</h2>
                        <h2><span className='font-bold text-gray-700'>• Skills</span> – key technologies and abilities</h2>
                        <h2><span className='font-bold text-gray-700'>• Experience Level</span> – how many years you've worked or studied</h2>
                    </div>
                    <h2 className='ml-4'>Our AI will use this information to generate 5 tailored interview questions for you!</h2>
                </div>

                <div className='mb-6 text-gray-800'>
                    <h2 className='font-semibold mb-1'>2. Answer the Questions</h2>
                    <h2 className='ml-7'>You’ll be presented with the questions one by one. Use the microphone to record your answers and the camera to capture your speaking style and body language.</h2>
                    <h2 className='ml-7 flex items-center'>{'( '}<TriangleAlert className='text-red-700 h-5 w-5 mx-1'/> <span className='font-bold text-gray-700 mr-1'>Note:</span> For privacy reasons, your video is not recorded or stored during the mock interview.{' )'}</h2>
                </div>

                <div className='text-gray-800 mb-6'>
                    <h2 className='font-semibold'>3. Get Instant Feedback</h2>
                    <h2 className='ml-7'>Once you've answered all questions, you'll be redirected to the Feedback section where you can:</h2>
                    <div className='ml-5'>
                        <h2 className='flex items-center'><Dot className='h-7 w-7'/> Review the questions</h2>
                        <h2 className='flex items-center'><Dot className='h-7 w-7'/> See the correct answers</h2>
                        <h2 className='flex items-center'><Dot className='h-7 w-7'/> Compare them with your responses</h2>
                        <h2 className='flex items-center'><Dot className='h-7 w-7'/> Get personalized suggestions to improve your communication, confidence, and presentation skills</h2>
                    </div>
                </div>

                <div className='text-gray-800 mb-6'>
                    <h2 className='font-semibold'>4. Retake or Upgrade</h2>
                    <h2 className='ml-7'>You can create a new interview and practice as much as you want with the Premium Plan! The free plan allows one interview session per job role to help you get started.</h2>
                </div>
            </div>

        </div>
    </div>
  )
}

export default WorkingInfo