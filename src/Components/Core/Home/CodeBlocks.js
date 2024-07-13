import React from 'react'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import CTAButton from './CTAButton'

const CodeBlocks = ({ Heading, SubHeading, codeblock, position, codecolor, btnText1, btnText2, gradient }) => {
    return (
        <div className={`flex ${position} gap-x-40 flex-row items-center lg:flex-row md:flex-col sm:flex-col  `}>
            <div className='w-[100%]'>
                <div className="text-center text-4xl font-semibold ">{Heading}</div>
                <div className='mt-[40px] w-[11/12] text-lg text-richblack-300 text-center'>{SubHeading}</div>
                <div className='mt-[40px] flex flex-row justify-evenly'>
                    <Link to='/signup'>
                        <CTAButton text={btnText1} active={true} className=''></CTAButton>
                    </Link>
                    <Link to='/About'>
                        <CTAButton text={btnText2} active={false}></CTAButton>
                    </Link>
                </div>
            </div>
            <div className={`w-[100%] gap-[-12px] flex flex-row codecolor border border-richblack-600 p-[20px] bg-gradient-to-r relative z-1 md:mt-[10rem] sm:mt-[5rem]`}>
                <div className={`absolute ${gradient} top-10 z-10 w-[50%] h-[60%] rounded-[100%] blur-[99px]`}></div>
                <div className="w-[6%]">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] ${codecolor} font-bold flex flex-col`}>
                    <TypeAnimation
                        sequence={[codeblock, 1000, ""]}
                        cursor={true}
                        repeat={Infinity}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks