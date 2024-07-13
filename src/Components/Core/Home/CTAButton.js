import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const CTAButton = ({text,active,arrow}) => {
  return (
    <div className={`flex flex-row items-center font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] text-center text-[16px] p-3 ${active ? "bg-yellow-100 text-black" : "bg-richblack-800 text-white"}  rounded-md  hover:shadow-none hover:scale-95 transition-all duration-200`}>
        {text}
        <div className='ml-[5px]'>
          {arrow?(<FaArrowRight></FaArrowRight>):(<div></div>)}
        </div>
    </div>
  )
}

export default CTAButton