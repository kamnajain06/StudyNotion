import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { MdStars } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { removeItems } from '../../../../slices/cartSlice';
import RatingStars from '../../../common/RatingStars';
import GetAvgRating from '../../../../utils/getAvgRating';
import RenderTotalAmount from './RenderTotalAmount';
import { buyCourse } from '../../../../services/operations/buyCourseApi';

const RenderCartCourses = () => {

    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    

    return (
        <div className='flex flex-col gap-4'>
            {/* {console.log("Cart Length", cart.length)} */}
            {
                cart.length > 0 ? (
                    cart.map((course,index ) => {
                       return (
                            <div key={index} className='text-white w-full flex justify-between pr-10'>
                                <div className='flex gap-2 items-center '>
                                    <img src={course?.thumbnail}
                                    className='max-w-[300px] min-w-[200px] max-h-[150px] rounded-lg'
                                    ></img>
                                    <div className='flex flex-col gap-1 pl-3'>
                                        <p className='text-lg'>{course?.title}</p>
                                        <p className='text-sm text-richblack-300'>{course?.category?.name}</p>
                                        <div className='flex items-center gap-1 text-yellow-50'>
                                            {/* <span>Get Average Rating</span> */}
                                            <span>{GetAvgRating(course?.ratingAndReviews) || 0}</span>
                                            <RatingStars Review_Count={GetAvgRating(course?.ratingAndReviews) || 0} ></RatingStars>
                                            <span>{course?.ratingAndReviews?.length} Ratings</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-5 '>
                                    <button
                                        className='flex items-center gap-1 bg-richblack-700 font-bold text-pink-200 px-3 py-2 rounded-md text-lg'
                                        onClick={() => dispatch(removeItems(course._id))}>
                                        <MdDelete />
                                        <span>Remove</span>
                                    </button>
                                    <p className='text-3xl text-yellow-50'>Rs. {course?.price}/-<span className='text-sm'>.00</span></p>
                                </div>
                            </div>)
                    })
                ) : (<>No Courses in Cart</>)
            }
        </div>
    )
}

export default RenderCartCourses