import React, { useState , useEffect} from 'react'
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { HiGlobeAsiaAustralia } from "react-icons/hi2";
import { LuPhoneCall } from "react-icons/lu";
import ContactForm from "../Components/common/ContactForm";
import ReviewSlider from '../Components/common/ReviewSlider';
import Footer from '../Components/common/Footer';
import { getAllRatingAndReviews } from '../services/operations/ratingAndReviewApi';




const ContactUs = () => {

    const [reviewCards, setReviewCards] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ; (async () => {
            setLoading(true);
            const result = await getAllRatingAndReviews();
            if (result) {
                console.log("Result", result);
                console.log("result?.data?.ratingNreviews", result?.data?.ratingNreviews)
                setReviewCards(result?.data?.ratingNreviews);
            }
            setLoading(false);
            console.log("reviewCards", reviewCards);
        })();
    }, []);

    return (
        <div className='w-screen  pt-[150px]'>
            <div className='lg:w-10/12 w-full p-1 lg:mx-auto'>
                <div className='flex flex-col lg:flex-row lg:justify-between lg:gap-[100px] gap-y-10 items-center lg:items-start'>
                    <div className='flex flex-col bg-richblack-800  text-white gap-10 lg:p-10 p-10 lg:w-[40%] w-2/3 min-h-full lg:h-[30rem] rounded-xl'>
                        <div className='flex flex-col'>
                            <div className='flex flex-row items-center gap-2'>
                                <BiSolidMessageSquareDetail className='text-lg' />
                                <div className='font-bold text-lg'>Chat on us</div>
                            </div>
                            <div className='text-sm text-richblack-300 mt-[5px]'>
                                Our friendly team is here to help.
                            </div>
                            <div className='text-sm text-richblack-300 font-bold'>info@studyverse.com</div>
                        </div>
                        <div>
                            <div className='flex flex-row items-center gap-2'>
                                <HiGlobeAsiaAustralia className='text-lg' />
                                <div className='font-bold text-lg'>Visit us</div>
                            </div>
                            <div className='text-sm text-richblack-400 mt-[5px]'>
                                Come and say hello at our office HQ.
                            </div>
                            <div className='text-sm text-richblack-300 font-bold'>Model Town , 1st Block, 1st Floor,Gurgaon</div>
                            <div className='text-sm text-richblack-300 font-bold'>Haryana-560016</div>
                        </div>
                        <div>
                            <div className='flex flex-row items-center gap-2'>
                                <LuPhoneCall className='text-blue-200 animate-pulse text-lg' />
                                <div className='font-bold text-lg'>Call us</div>
                            </div>
                            <div className='text-sm text-richblack-400 mt-[5px]'>
                                Our friendly team is here to help.
                            </div>
                            <div className='text-sm text-richblack-300 font-bold'>Mon - Sat From 8am to 8pm</div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className='w-2/3 text-richblack-5 border rounded-xl border-richblack-600 lg:p-16 p-3'>
                        <div className='text-4xl font-bold'>Got a Idea? We've got the skills.</div>
                        <div className='text-4xl font-bold'>Let's team up</div>
                        <div className='text-richblack-400 my-[30px]'>Tell us more about yourself and what you're got in mind.</div>
                        <ContactForm></ContactForm>
                    </div>
                </div>
                <div className=' flex flex-col items-center justify-center overflow-x-hidden mt-16'>
                    <div className='text-white text-4xl font-bold'>Reviews from Other Learners</div>
                    <div className='w-11/12'>
                        <ReviewSlider cards={reviewCards}></ReviewSlider>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default ContactUs