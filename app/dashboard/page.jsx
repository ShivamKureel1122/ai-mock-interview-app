"use client"
import React, { useEffect, useState } from 'react'
import AddInterview from './_components/AddInterview'
import axios from 'axios'
import { useUser, SignInButton } from '@clerk/nextjs'
import { ArrowRight, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import StartInterviewAlert from './_components/StartInterviewAlert'
import { toast } from 'sonner'

const Dashboard = () => {
  const [interviewList, setInterviewList] = useState([])
  const { isLoaded, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    getInterviews()
  }, [user])

  if(isLoaded && !user) {
    return <SignInButton/>
  }

  const getInterviews = async () => {
    try {
      const emailAddress = user.primaryEmailAddress?.emailAddress
      // console.log('Email: ', emailAddress)
      const response = await axios.get('/api/interview/all', {
        params: { email: emailAddress }
      })
      setInterviewList(response?.data?.interviewList)
    } catch (error) {
      console.log('Error occured in getInterviews function: ', error.message)
      toast.error('Error fetching interviews')
    }
  }

  const getFormattedDateTime = (data) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const formattedDate = moment(data).format('MM-DD-YYYY')
    const newDate =  months[formattedDate.split('-')[0] - 1] + " " + formattedDate.split('-')[1] + ", " + formattedDate.split('-')[2]

    const formattedTime = moment(data).format('hh:mm A')
    return [ newDate, formattedTime ]
  }

  return (
    <div>
      <h2 className='text-2xl font-bold text-gray-800'>Dashboard</h2>
      <h2 className='text-gray-600 mt-2'>Create and Start your AI Mock Interview</h2>

      <div className='flex justify-start mt-2'>
        <AddInterview/>
      </div>

      <div>
        <h2 className='font-bold text-gray-800 text-xl my-6'>Interviews you've created</h2>

        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-6'>
          {
            interviewList && interviewList.map((item, index) => (
              <div key={index} className=' border rounded-xl shadow-md p-6'>
                <div className='flex justify-between'>
                  <h2 className='font-bold text-indigo-700 text-2xl'>{item.jobRole}</h2>
                  <h2 className={`text-sm font-semibold ${!item.isCompleted ? 'text-red-700' : 'text-green-700'}`}>
                    { !item.isCompleted ? 'Pending' : 'Completed' }
                  </h2>
                </div>
                <div className='text-gray-400 text-sm flex gap-1'>{
                  getFormattedDateTime(item.createdAt).map((item, i) => (
                    <h2 key={i} className={`${i==0 && 'pr-1'}`}>{item}</h2>
                  ))
                }</div>
                <h2 className='text-sm text-gray-600 my-1'>Years of Experience: {item.experience}</h2>
                
                <div className='flex flex-wrap gap-4 my-3'>
                  { item.skills.split(', ').map((skill, i) => (
                      <div key={i} className='border rounded-sm text-sm text-gray-700 font-semibold px-2 py-1'>{skill}</div>
                  ))}
                </div>
                <div className='flex gap-3 justify-end'>
                  <Button
                  variant={'outline'}
                  className='text-red-700 hover:text-red-700 hover:cursor-pointer'
                  >
                    <Trash className='h-5 w-5'/>
                    Delete
                  </Button>
                  {
                    item.isCompleted
                      ? (
                        <Button
                        variant={'outline'}
                        className='hover:cursor-pointer'
                        onClick={() => router.push(`/dashboard/interview/${item._id}/feedback`)}
                        >
                          Feedback
                          <ArrowRight className='h-5 w-5'/>
                        </Button>
                      )
                      : (
                        <StartInterviewAlert text="Start" interviewId={item._id}/>
                      )
                  }
                  {/* <Button
                  variant={item.isCompleted && 'outline'}
                  className={`hover:cursor-pointer ${!item.isCompleted && 'bg-indigo-600 text-white hover:bg-indigo-500 ease-in-out'}`}
                  onClick={() => router.push(`/dashboard/interview/${item._id}/${item.isCompleted ? 'feedback' : 'start'}`)}
                  >
                    { item.isCompleted ? 'Feedback' : 'Start' }
                    <ArrowRight className='h-5 w-5'/>
                  </Button> */}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard