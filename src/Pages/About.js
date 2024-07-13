import React, {useState, useEffect} from 'react'
import HighlightedText from '../Components/Core/Home/HighlightedText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FundingStory from "../assets/Images/FoundingStory.png"
import Quote from '../Components/Core/About/Quote'
import StatsComponent from '../Components/Core/About/StatsComponent'
import Footer from '../Components/common/Footer'
import LearningGrid from '../Components/Core/About/LearningGrid'
import ContactFormSection from '../Components/Core/About/ContactFormSection'
import ReviewSlider from '../Components/common/ReviewSlider'
import { useNavigate } from 'react-router-dom'
import { getAllRatingAndReviews } from '../services/operations/ratingAndReviewApi'

const About = () => {

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
    <div className='w-screen pt-[150px] flex flex-col justify-center mx-auto gap-[100px]'>
      {/* Section 1 */}
      <section className='w-11/12 flex flex-col justify-center mx-auto'>
        <div className='w-10/12 flex flex-col justify-center gap-y-4 mx-auto'>
          <header className='flex text-4xl text-richblack-5 justify-center font-bold'>
            Driving Innovation in Online Education for a 
          </header>
          <div className='flex text-4xl  justify-center font-bold'><HighlightedText text={"Brighter Future"} clr={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}></HighlightedText></div>
          <p className='flex w-full text-center text-richblack-50 mt-[20px]'>StudyNotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
          <div className=' flex-col lg:flex-row gap-y-7 mx-auto hidden lg:flex gap-x-4 justify-center mt-[60px]'>
            <img src={BannerImage1} width={400}></img>
            <img src={BannerImage2} width={400}></img>
            <img src={BannerImage3} width={400}></img>
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <section className='w-11/12 mx-auto border-b border-richblack-700 '>
        <div className='my-[40px]'>
          <Quote></Quote>
        </div>
      </section>
      {/* Section 3 */}
      <section className='w-11/12 flex flex-col lg:flex-row gap-y-6 lg:justify-between mx-auto mt-[30px] items-center'>
        <div className='flex flex-col gap-y-7 w-1/2'>
          <div className='text-4xl font-bold'><HighlightedText text={"Our Founding Story"} clr={"bg-gradient-to-b from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"}></HighlightedText></div>
          <div className='text-richblack-100 flex flex-col gap-y-10'>
          <div><p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p></div>
          <div><p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p></div>
          </div>
        </div>
        <div className='w-1/2 flex lg:justify-end'>
          <img src={FundingStory} width={400} height={400} className='shadow-md shadow-pink-300'></img>
        </div>
      </section>
      {/* Section 4 */}
      <section className='w-11/12 flex flex-col lg:flex-row gap-10 mx-auto max-w-maxContent justify-between mt-[50px] items-center '>
        <div className='flex flex-col gap-x-10 w-1/2'>
          <HighlightedText text={"Our Vision"} clr={"bg-gradient-to-b from-[#ff512f] to-[#f09819]"}></HighlightedText>
          <div className='mt-[30px] w-full'><p className='text-richblack-100 w-full'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p></div>
        </div>
        <div className='flex flex-col gap-x-10 w-1/2'>
          <HighlightedText  text={"Our mission"} clr={"bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb]"}></HighlightedText>
          <p className='text-richblack-100 mt-[30px]'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
        </div>
      </section>
      {/* Section 5 */}
      <section className='bg-richblack-800 my-[80px] '>
      <StatsComponent></StatsComponent>
      </section>
      {/* Section 6 */}
      <section className='w-11/12 mx-auto'>
         <LearningGrid></LearningGrid>
      </section>
      {/* Section 7 */}
      <section className='w-11/12 mx-auto'>
        <ContactFormSection></ContactFormSection>
      </section>
      {/* Section 8 */}
      <div className=' flex flex-col items-center justify-center overflow-x-hidden '>
            <div className='text-white text-4xl font-bold'>Reviews from Other Learners</div>
            <div className='w-11/12'>
              <ReviewSlider cards={reviewCards}></ReviewSlider>
            </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default About