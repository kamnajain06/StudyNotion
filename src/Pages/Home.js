import React, { useEffect, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom"
import CTAButton from '../Components/Core/Home/CTAButton';
import HighlightedText from '../Components/Core/Home/HighlightedText';
import About from "../Pages/About";
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../Components/Core/Home/CodeBlocks';
import TimeLineSection from '../Components/Core/Home/TimeLineSection';
import LearningLanguageSection from '../Components/Core/Home/LearningLanguageSection';
import Instructor from "../assets/Images/Instructor.png"
import Footer from '../Components/common/Footer';
import { HomePageExplore } from '../data/homepage-explore';
import Cards from '../Components/Core/Home/Cards';
import { useSelector } from 'react-redux';
import ReviewSlider from '../Components/common/ReviewSlider';
import { getAllRatingAndReviews } from '../services/operations/ratingAndReviewApi';

const Home = () => {

  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [ reviewCards, setReviewCards] = useState([]);
  const [ loading, setLoading] = useState(false);

  useEffect(()=> {
    ;(async()=> {
      setLoading(true);
      const result = await getAllRatingAndReviews();
      if(result){
        console.log("Result", result);
        console.log("result?.data?.ratingNreviews", result?.data?.ratingNreviews)
        setReviewCards(result?.data?.ratingNreviews);
      }
      setLoading(false);
      console.log("reviewCards", reviewCards);
    })();
  },[]);

  return (
    <div className='pt-[60px] '>
        {/* Section-1 */}
        <div className=' mx-auto flex flex-col justify-between items-center w-11/12 text-white '>

            {/* Become a Intsructor Button */}
            <Link to="/signup">
                <div className='w-fit mt-[70px] mb-[40px] border-2 border-richblack-700 rounded-full bg-richblack-800 text-richblack-100 hover:scale-95 transition-all duration-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none' >
                    <div className=' px-[30px] py-[12px] rounded-full flex flex-row items-center gap-2 transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            {/* Heading  */}
            <div className='text-center text-4xl font-semibold '>
                Empower your future with 
                <HighlightedText text={"Coding Skills"} clr={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>
            </div>

            {/* SubHeading */}
            <div className=' mt-[10px] w-[80%]  text-center text-lg text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-[60px] mt-[20px]">
                <Link to='/About'>
                    <CTAButton text={"Learn More"} active={true}></CTAButton>
                </Link>
                <Link to="/signup">
                    <CTAButton text={"Book a demo"} active={false}></CTAButton>
                </Link>
            </div>

            {/* Video */}
            <div className='flex flex-row items-center relative'>
                <video className="w-[800px] my-[40px] shadow-[10px_-5px_50px_-5px] shadow-blue-200"
                    muted
                    loop
                    autoPlay
                >
                <source src={Banner} type="video/mp4"></source>
                </video>
                
            </div>

            {/* CodeBlocks */}
            <div className='w-11/12 relative mt-[40px]'>
                <CodeBlocks 
                    Heading={<div>
                        Unlock your <HighlightedText text={"coding potential"} clr={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}></HighlightedText> with our online courses
                    </div>}
                    SubHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    position = {`flex-row`}
                    codecolor={`text-yellow-100`}
                    btnText1={"Try it yourself"}
                    btnText2={"Learn more"}
                    gradient={"bg-yellow-100"}
                />
            </div>
            <div className='mt-[70px] w-11/12'>
                <CodeBlocks 
                    Heading={<div>
                       Start<HighlightedText text={"coding in seconds"} clr={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}></HighlightedText> with our online courses
                    </div>}
                    SubHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                    position = {`flex-row-reverse`}
                    codecolor={`text-blue-100`}
                    btnText1={"Continue Lesson"}
                    btnText2={"Learn more"}
                    gradient={"bg-blue-100"}
                />
            </div>
            
            {/* Cards Section */}
            <div className='mt-[200px] w-screen text-center mb-[100px]'>
              <div className='text-4xl font-bold'>
                Unlock the <HighlightedText text={"Power of Code"} clr={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}></HighlightedText>
              </div>
              <div className='text-richblack-300 mt-[10px] font-bold'>
                Learn to build anything you can imagine
              </div>
              <Cards></Cards>
              <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
                <div className="flex flex-row gap-7 text-white lg:mt-[100px]">
                  <CTAButton active={true} linkto={"/signup"} text={`Explore Full Catalog`} arrow={true}></CTAButton>
                  <CTAButton active={false} linkto={"/login"} text={"Learn More"}></CTAButton>
                </div>
            </div>
            </div>
        </div>
        {/* Section 2 */}
        <div className="bg-pure-greys-5 w-screen text-richblack-700">
            {/* Explore Full Catagory Section */}
            

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[10rem] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <HighlightedText text={"job that is in demand."} clr={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>
            </div>
            <div className="flex flex-col items-center gap-10 lg:w-[40%]">
              <div className="text-[16px] font-bold">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"} text={"Learn More"}></CTAButton>
            </div>
          </div>
          {/* Timeline Section - Section 2 */}
            <TimeLineSection />

          {/* Learning Language Section - Section 3 */}
            <LearningLanguageSection />
        </div>
      </div>
        {/* Section 3 */}
        <div className='flex flex-row lg:flex-row md:flex-row sm:flex-col lg:mt-[30rem] md:mt-[30rem] mt-[100px] mb-[100px] w-10/12 mx-auto gap-[100px] justify-center items-center'>
          <div className='relative '>
            <img src={Instructor} width={1000} className=' rounded-lg shadow-lg shadow-richblue-100'  ></img>
            {/* <div className='absolute bottom-[20px] left-[-20px] z-0 w-[560px] bg-white border border-white h-[500px]'> </div> */}
          </div>
          <div className='flex flex-col'>
            <div className='text-white text-5xl font-bold'>Become an <HighlightedText text={"Instructor"} clr={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}></HighlightedText></div>
            <div className='mt-[10px] text-richblack-200'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
            <div className='mt-[50px] w-[250px] sm:w-full flex justify-center'>
            <CTAButton text={"Start Learning Today"} active={true} arrow={true} 
            className='flex border border-red-600 '></CTAButton>
            </div>
          </div>
        </div>
        {/* Review Section */} 
        <div className=' flex flex-col items-center justify-center overflow-x-hidden '>
            <div className='text-white text-4xl font-bold'>Reviews from Other Learners</div>
            <div className='w-11/12'>
              <ReviewSlider cards={reviewCards}></ReviewSlider>
            </div>
        </div>
        {/* Section Footer */}
        <Footer></Footer>
    </div>
  )
}

export default Home