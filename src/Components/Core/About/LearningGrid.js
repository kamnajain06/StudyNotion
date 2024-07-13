import React from 'react'
import HighlightedText from '../Home/HighlightedText'
import CTAButton from '../Home/CTAButton'
import { Link } from 'react-router-dom'

const LearningGrid = () => {
    const data = [
        {
            order:-1,
            title: "World-Class Learning for",
            text:"Anyone, Anywhere",
            clr:"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]",
            description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            BtnText:"Learn More",
            BtnLink:"/"
        },
        {
            order:1,
            title: "Curriculum Based on Industry Needs",
            description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
        },
        {
            order:2,
            title: "Our Learning Methods",
            description:"Studynotion partners with more than 275+ leading universities and companies to bring."
        },
        {
            order:3,
            title: "Certification",
            description:"Studynotion partners with more than 275+ leading universities and companies to bring."
        },
        {
            order:4,
            title: 'Rating "Auto Grading" ',
            description:"Studynotion partners with more than 275+ leading universities and companies to bring."
        },
        {
            order:5,
            title: "Ready to Work",
            description:"Studynotion partners with more than 275+ leading universities and companies to bring."
        },
    ]
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 text-richblack-5'>
        {
            data.map((item, index) => {
                return <div 
                key={index}
                className={`
                    lg:h-[300px] max-h-maxContent
                ${index === 0 && "lg:col-span-2"} 
                ${item.order === -1 ? "" : (item.order % 2 === 0 ? "bg-richblack-800" : "bg-richblack-700")}
                ${item.order === 3 && "lg:col-start-2"}`}
                >
                    {
                        item.order < 0 ? (<div className='flex flex-col gap-y-4 p-4'>
                            <div className='text-4xl font-bold'>{item.title}</div>
                            <HighlightedText text={item.text} clr={item.clr}></HighlightedText>
                            <div className='text-richblack-200'><p>{item.description}</p></div>
                            <Link to={item.BtnLink} className='flex' ><CTAButton text={item.BtnText} active={true} ></CTAButton></Link>
                        </div>) : (<div className='flex flex-col gap-y-6 p-10'> 
                            <div className='text-xl '>{item.title}</div>
                            <div className='text-sm text-richblack-200'>{item.description}</div>
                        </div>)
                    }
                </div>
            })
        }
    </div>
  )
}

export default LearningGrid