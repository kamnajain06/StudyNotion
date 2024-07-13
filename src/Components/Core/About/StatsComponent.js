import React from 'react'

const StatsComponent = () => {
    const data = [
        {
            title: "Active Students",
            value: "5K",
        },
        {
            title: "Mentors",
            value: "10+",
        },
        {
            title: "Courses",
            value: "200+",
        },
        {
            title: "Awards",
            value: "50+",
        }
    ]
  return (
    <div className='w-8/12 flex flex-col lg:flex-row items-center gap-y-6 justify-between text-richblack-5 mx-auto py-10'>
        {
            data.map((item, index) =>{
                return <div key={index} className='flex flex-col text-lg font-bold'>
                    <div className='flex w-full text-center justify-center text-3xl'>{item.value}</div>
                    <div className='text-richblack-400 '>{item.title}</div>
                </div>
            } )
        }
    </div>
  )
}

export default StatsComponent