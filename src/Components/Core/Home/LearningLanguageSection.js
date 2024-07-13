import React from 'react'
import HighlightedText from './HighlightedText'
import know from "../../../assets/Images/Know_your_progress.png"
import compare from "../../../assets/Images/Compare_with_others.png"
import plan from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from './CTAButton'

const LearningLanguageSection = () => {
  return (
    <div className='mt-[150px] w-screen mb-[150px] '>
      <div className='w-11/12 flex flex-col items-center justify-center mx-auto  '>
        <div className='text-4xl font-bold'>
          Your Swiss Knife for <HighlightedText text={"learning any language"} clr={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}></HighlightedText>
        </div>
        <div className='text-md mt-[10px] text-wrap text-center'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className='w-11/12 flex  lg:mt-[80px] md:mt-[100px] relative z-0  h-[600px] md:h-0 sm:h-0'>
          <img src={know} className="absolute top-20 z-[-1] left-[-10px] md:block hidden"></img>
          <img src={plan} className="absolute top-20  lg:right-[50px] sm:right-[100px] z-20 md:block hidden"></img>
          <img src={compare} className="absolute top-20  z-10 lg:left-[310px] md:left-[500px] md:block hidden"></img>
        </div>
        <CTAButton text={"Learn More"} active={true} className='absolute w-3/4  lg:mt-[60px] md:mt-0 sm:mt-0'></CTAButton>
      </div>
    </div>
  )
}

export default LearningLanguageSection