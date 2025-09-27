"use client"
import Header from '../_components/Header'
import { useState, useEffect } from 'react'
import { usePathname } from "next/navigation";

function DashboardLayout({children}) {
  const pathname = usePathname()
  const [path, setPath] = useState('')
  const [startPage, setStartPage] = useState(false)

  useEffect(() => {
    setPath(pathname)
  }, [pathname])

  useEffect(() => {
    if(path?.includes('start')) {
      setStartPage(true)
    } else {
      setStartPage(false)
    }
  }, [path])

  // console.log("Current path:", path)
  // console.log('start page: ', startPage)

  return (
    <div>
      { !startPage && <Header/> }
      <div className='mx-4 md:mx-28 lg:mx-36 pt-12 pb-20 px-8'>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout