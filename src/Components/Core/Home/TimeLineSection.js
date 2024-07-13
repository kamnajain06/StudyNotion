import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import Image from "../../../assets/Images/TimelineImage.png"

const TimeLineSection = () => {

  const timeline = [
    {
      Logo: Logo1,
      Heading: 'Leadership',
      SubHeading : 'Fully committed to the success company',
    },
    {
      Logo: Logo2,
      Heading: 'Leadership',
      SubHeading : 'Fully committed to the success company',
    },
    {
      Logo: Logo3,
      Heading: 'Leadership',
      SubHeading : 'Fully committed to the success company',
    },
    {
      Logo: Logo4,
      Heading: 'Leadership',
      SubHeading : 'Fully committed to the success company',
    }
  ]
  return (
    <div>
      <div className='flex lg:flex-row sm:flex-col items-center gap-20'>
        <div className='flex flex-col gap-5'>
          {
            timeline.map((element,index)=> {
              return (
                <div key={index} className='w-[100%] flex flex-row gap-4 items-center'>
                  <div className='flex bg-white shadow-lg justify-center  p-[20px] rounded-[100%]'>
                    <img className='rounded-full ' src={element.Logo}></img>
                  </div>
                  <div className=''>
                    <div>{element.Heading}</div>
                    <div>{element.SubHeading}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='' >
          <div className='relative shadow-xl shadow-blue-100 '>
            <img className='rounded-md ' src={Image} width={700}></img>
            <div className='flex flex-row border w-10/12 justify-center items-center left-[55px]  absolute bg-black bottom-[-50px] h-[100px]'>
            <div className='w-1/2 flex flex-row gap-6 items-center border-r border-white justify-center'>
              <div className='text-white text-4xl font-bold  '>
                10
              </div>
              <div className='text-md text-white '>
                Years of Experience
              </div>
            </div>
            <div className='w-1/2 flex flex-row gap-6 items-center justify-center'>
              <div className='text-white text-4xl font-bold '>
                250
              </div>
              <div className='text-md text-white '>
                Types of Courses
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLineSection