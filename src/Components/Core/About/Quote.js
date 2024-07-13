import React from 'react'
import HighlightedText from '../Home/HighlightedText'

const Quote = () => {
  return (
    <div className='text-white text-4xl text-center font-bold '>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightedText text={"combines technology"} clr={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}></HighlightedText>
        , {" "} <HighlightedText text={"expertise"} clr={"bg-gradient-to-b from-[#ff512f] to-[#f09819]"}></HighlightedText>
        <span>, and community to create an</span>
        <HighlightedText text={"unparalleled educational experience."} clr={"bg-gradient-to-b from-[#e65c00] to-[#f9d423]"}></HighlightedText>
    </div>
  )
}

export default Quote