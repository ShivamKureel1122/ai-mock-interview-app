import React from 'react'
import Header from '../app/_components/Header'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Home = () => {
  return (
    <div>
        <Header/>
        <div className='mx-4 md:mx-28 lg:mx-36 py-12 px-8'>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-gray-800 text-4xl font-bold mb-1 max-w-3xl'>Practice, Improve, and Ace Your Interviews </h2>
                <h2 className='text-gray-800 text-4xl font-bold mb-1 max-w-3xl '>with AI Mock Interviewer.</h2>
                <h2 className='text-gray-500 text-lg mb-4'>Get personalized interview questions, record your answers, and receive instant feedback to boost your confidence.</h2>
                <Link href={'/dashboard'}>
                    <Button className='bg-indigo-700 hover:bg-indigo-600 hover:cursor-pointer'>
                        Let's Get Started
                        <ArrowRight className='h-5 w-5'/>
                    </Button>
                </Link>
            </div>

            <section className="py-12 bg-gray-50 my-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">What Our Users Say!</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <p className="text-gray-600 mb-4">“This app transformed how I prepare for interviews. The AI-generated questions were spot on, and the feedback helped me improve my communication style drastically!”</p>
                        <p className="text-sm font-semibold text-gray-800">Rohit Sharma, Software Engineer</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <p className="text-gray-600 mb-4">“Practicing with this tool gave me the confidence to face real interviews. The speaking and body language tips were a game-changer!”</p>
                        <p className="text-sm font-semibold text-gray-800">Anjali Mehta, Product Designer</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <p className="text-gray-600 mb-4">“A perfect platform for anyone looking to sharpen their interview skills. The one-on-one feedback is precise and actionable!”</p>
                        <p className="text-sm font-semibold text-gray-800">Vikram Singh, Data Analyst</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <p className="text-gray-600 mb-4">“The best part is how easy and interactive it is. It feels like you’re preparing with a coach, not just another app.”</p>
                        <p className="text-sm font-semibold text-gray-800">Priya Nair, Marketing Associate</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <p className="text-gray-600 mb-4">“The personalized experience sets this app apart. I finally feel prepared and ready to tackle tough interviews!”</p>
                        <p className="text-sm font-semibold text-gray-800">Saurabh Verma, Project Manager</p>
                    </div>

                    <div className="bg-white px-6 py-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <p className="text-gray-600 mb-4">“I was nervous before every interview, but this app made practice fun and structured. The feedback helped me highlight my strengths and work on weak points!”</p>
                        <p className="text-sm font-semibold text-gray-800">Neha Gupta, UX Researcher</p>
                    </div>

                    </div>
                </div>
            </section>
        </div>

        <footer className="bg-gray-100 text-gray-600 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
                
                <div className="max-w-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">NextHire</h3>
                    <p className="text-sm text-gray-600">
                    Helping you prepare for interviews with personalized AI-driven questions, real-time feedback, and communication tips to boost your confidence and performance.
                    </p>
                </div>

                <div className="flex space-x-8 text-sm">
                    <div>
                    <h4 className="font-semibold mb-2 text-gray-700">Company</h4>
                    <ul className="space-y-1">
                        <li><a href="#" className="hover:text-gray-900 transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors">Blog</a></li>
                    </ul>
                    </div>
                    <div>
                    <h4 className="font-semibold mb-2 text-gray-700">Support</h4>
                    <ul className="space-y-1">
                        <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
                    </ul>
                    </div>
                </div>

                <div className="flex space-x-4 justify-center items-center">
                    <a href="https://www.instagram.com/yourprofile" className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.415a4.92 4.92 0 0 1 1.675 1.088 4.92 4.92 0 0 1 1.088 1.675c.175.46.36 1.26.415 2.43.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.415 2.43a4.92 4.92 0 0 1-1.088 1.675 4.92 4.92 0 0 1-1.675 1.088c-.46.175-1.26.36-2.43.415-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.415a4.92 4.92 0 0 1-1.675-1.088 4.92 4.92 0 0 1-1.088-1.675c-.175-.46-.36-1.26-.415-2.43C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.415-2.43a4.92 4.92 0 0 1 1.088-1.675A4.92 4.92 0 0 1 5.34 2.648c.46-.175 1.26-.36 2.43-.415C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.129 4.748.308 3.905.632 3.062.956 2.355 1.408 1.7 2.064.96 2.804.508 3.511.184 4.354.01 5.197-.129 6.224-.072 7.5.014 8.78 0 9.189 0 12s.014 3.22.072 4.5c.057 1.276.236 2.303.46 3.146.324.843.775 1.55 1.431 2.206.655.655 1.363 1.107 2.206 1.431.843.224 1.87.403 3.146.46 1.28.058 1.689.072 4.5.072s3.22-.014 4.5-.072c1.276-.057 2.303-.236 3.146-.46.843-.324 1.55-.775 2.206-1.431.655-.655 1.107-1.363 1.431-2.206.224-.843.403-1.87.46-3.146.058-1.28.072-1.689.072-4.5s-.014-3.22-.072-4.5c-.057-1.276-.236-2.303-.46-3.146-.324-.843-.775-1.55-1.431-2.206C20.16 1.408 19.452.956 18.609.632c-.843-.224-1.87-.403-3.146-.46C15.22.014 14.811 0 12 0z"/>
                        <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z"/>
                        <circle cx="18.406" cy="5.594" r="1.44"/>
                    </svg>
                    </a>

                    <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 4.01c-.77.34-1.6.57-2.46.67a4.3 4.3 0 0 0 1.88-2.37 8.48 8.48 0 0 1-2.72 1.04 4.24 4.24 0 0 0-7.23 3.86A12 12 0 0 1 3.16 3.15 4.24 4.24 0 0 0 4.3 9.72a4.21 4.21 0 0 1-1.92-.53v.05a4.24 4.24 0 0 0 3.4 4.16 4.27 4.27 0 0 1-1.91.07 4.24 4.24 0 0 0 3.96 2.95A8.5 8.5 0 0 1 2 19.54 12 12 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.34 8.34 0 0 0 22 4.01z"/>
                    </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors pb-1" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.89h4.56v12.11H.22V8.89zM8.98 8.89h4.37v1.65h.06c.61-1.15 2.11-2.36 4.34-2.36 4.64 0 5.5 3.05 5.5 7v8.82h-4.56v-7.81c0-1.86-.03-4.26-2.6-4.26-2.6 0-3 2.03-3 4.12v7.95h-4.56V8.89z"/>
                    </svg>
                    </a>
                </div>

                </div>

                <div className="border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
                © 2025 NextHire. All rights reserved.
                </div>

            </div>
        </footer>

    </div>
  )
}

export default Home