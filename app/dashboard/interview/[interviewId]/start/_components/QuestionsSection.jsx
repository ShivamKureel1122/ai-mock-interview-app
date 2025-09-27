import { Volume2 } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({ mockInterviewQuestions, activeIndex, setActiveIndex }) => {
  const textToSpeech = (text) => {
    if('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text)
      // console.log('speech', speech)

      const voices = window.speechSynthesis.getVoices()
      const selectedVoice = voices.find(voice => voice.name === 'Google US English')

      if (selectedVoice) {
        speech.voice = selectedVoice
      }

      window.speechSynthesis.speak(speech)
    } else {
      alert('Sorry, your browser does not support text to speech')
    }
  }

  return (
    <div className='p-5'>
      <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestions && mockInterviewQuestions.map((item, index) => (
            <h2 className={`px-2 py-3 text-gray-600 font-semibold rounded-full text-center cursor-pointer ${activeIndex === index ? 'bg-indigo-700 text-white' : 'bg-secondary'}`}
            onClick={() => setActiveIndex(index)}
            key={index}
            >
              Question #{index + 1}
            </h2>
        ))}
      </div>
      <h2
        className='pt-7 text-md pl-2 font-semibold text-gray-700'
      >{mockInterviewQuestions[activeIndex]?.question.replaceAll("`", "")}</h2>
      <Volume2 
        className='cursor-pointer text-gray-600 mt-4 ml-2'
        onClick={() => textToSpeech(mockInterviewQuestions[activeIndex]?.question.replaceAll("`", ""))}
      />
    </div>
  )
}

export default QuestionsSection