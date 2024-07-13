import React, { useEffect, useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import { Link } from 'react-router-dom'
import Home from '../../../Pages/Home';

const Cards = () => {
  const [tab, setTab] = useState(HomePageExplore[0].tag);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [card, setCard] = useState(HomePageExplore[0].courses[0]);

  // const setCards = (value)=> {
  //     setTab(value);
  //     console.log(tab);
  //     const result = HomePageExplore.filter((courses)=> courses.tag === tab);
  //     console.log(result)
  //     setCourses(result[0].courses);
  //     console.log(courses);
  //     setCard(result[0].courses[0].heading);
  //     console.log(card);
  // }
  const setCards = (value) => {
    setTab(value);
    console.log("Selected tab:", value);
  };

  useEffect(() => {
    if (tab) {
      const result = HomePageExplore.filter((courses) => courses.tag === tab);
      if (result.length > 0) {
        setCourses(result[0].courses);
        console.log("Filtered courses:", result[0].courses);
        setCard(result[0].courses[0].heading);
        console.log("Selected card:", result[0].courses[0].heading);
      }
    }
  }, [tab]);

  return (
    <div>
      <div>
        <div className='flex flex-row gap-4 w-10/12 lg:w-1/2 mx-auto h-full items-center my-[20px] bg-richblack-800 py-2 px-2 rounded-lg shadow-sm shadow-richblack-400'>
          {
            HomePageExplore.map((ele, index) => {
              return (
                <div key={index} className={`w-10/12 p-[5px] text-richblack-400 text-md hover:text-white
                            ${tab === ele.tag ? "text-white font-bold bg-richblack-900 rounded-full px-4" : ""}
                         hover:bg-richblack-900 hover:rounded-full cursor-pointer `}
                  onClick={() => setCards(ele.tag)}>
                  <Link >{ele.tag}</Link>
                </div>
              )
            })
          }
        </div>
        <div className='flex flex-row mt-[60px]'>
          <div className='flex flex-row lg:flex-row md:flex-row sm:flex-wrap w-11/12 mx-auto  justify-center'>
            {
              courses.map((element, index) => {
                return (<div key={index} onClick={() => setCard(element.heading)} className={`rounded-r-lg ${card === element
                  .heading ? "bg-white scale-[1.1] " : ""}  w-[350px] text-start h-[300px] mx-[20px] my-[2rem] flex flex-col justify-between  bg-richblack-800 hover:bg-white text-richblack-400 hover:text-black`}>
                  <div className=' py-[15px] px-[10px]'>
                    <div className={`font-bold text-lg hover:text-lg mb-[10px] ${card === element.heading ? "text-richblack-900 " : ""} `}>{element.heading}</div>
                    <div className='hover:text-richblack-400'>{element.description}</div>
                  </div>

                  <div className='flex flex-row items-center justify-between border-t-2 border-dashed w-full py-[10px]'>
                    <div className='text-richblue-200 hover:text-richblue-300 px-[10px] '>{element.level}</div>
                    <div className='px-[10px]'>{element.lessionNumber}</div>
                  </div>
                </div>)
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards