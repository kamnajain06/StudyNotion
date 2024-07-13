import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/getAvgRating';


const CourseCard = ({ course }) => {

    const [loading, setLoading] = useState(false);
    const [averageRating, setAverageRating] = useState(0);


    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAverageRating(count);
    },[course])
    
    // console.log("COURSE", course)
    return (
        <div className='text-richblack-5'>
            <Link to={`/course/${course._id}`}>
                <div className='w-[350px] mx-auto border border-richblack-700 rounded-md'>
                    <div className=''>
                        <img src={course.thumbnail} className='w-full h-[200px] object-fit'></img>
                    </div>
                    <div className='p-2 flex flex-col gap-1'>
                        <p className='text-2xl '>{course.title}</p>
                        <p className='text-richblack-200 text-[15px]'>{`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}</p>
                        <div className='flex items-center gap-1 '>
                            <span className='text-yellow-50'>{averageRating  || 0}</span>
                            <RatingStars Review_Count={averageRating}></RatingStars>
                            <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p className='font-bold text-richblack-5'>Rs. {course.price}/-</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard