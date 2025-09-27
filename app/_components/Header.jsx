"use client"
import Image from 'next/image'
import { UserButton, useUser, SignInButton, SignUpButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { LogIn, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header = () => {
  const path = usePathname()
  const router = useRouter()
  const { isLoaded, user } = useUser()
  const tabs = ['Home', 'Dashboard', 'How it works']

  console.log('path: ', path)

  return isLoaded && (
    <div className='flex justify-between items-center md:px-32 lg:px-38 py-3 transition-all shadow-md text-gray-900'>
        <div className='flex gap-2 items-center text-xl font-bold hover:cursor-pointer'>
          <Image src={'/logo.svg'} width={38} height={32} alt='logo'/>
          <span className='text-gray-800'>NextHire</span>
        </div>
        <div className='hidden md:flex gap-6'>
          {
            tabs.map((tab, index) => (
              <h2
              key={index}
              className={`hover:text-indigo-700 hover:cursor-pointer hover:font-bold ${path===`/${tab.replace(tab[0], tab[0].toLowerCase()).replace(/ /g, "-")}` && 'text-indigo-700 font-bold'}
              ${tab === 'Home' && path==='/' && 'text-indigo-700 font-bold'}`}
              onClick={() => {
                if(tab === 'Home') {
                  router.push('/')
                } else {
                  router.push(`/${tab.replace(tab[0], tab[0].toLowerCase()).replace(/ /g, "-")}`)
                }
              }}
              >
                {tab}
              </h2>
            )) 
          }
        </div>
        {
          user ? (
            <UserButton/>
          ) : (
            <div className='flex gap-4 items-center'>
              <SignUpButton>
                <Button
                className='bg-indigo-700 hover:bg-indigo-600 hover:cursor-pointer'
                >
                  Register
                  <UserPlus className='h-5 w-5 ml-1'/>
                </Button>
              </SignUpButton>
              <SignInButton>
                <Button
                variant={'outline'}
                className='hover:cursor-pointer'
                >
                  Login
                  <LogIn className='h-5 w-5 ml-1'/>
                </Button>
              </SignInButton>
            </div>
          )
        }
    </div>
  )
}

export default Header