import React from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { useState, useEffect } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            console.log("Response", response)
            setEnrolledCourses(response);
        } catch (err) {
            console.log("Unable to fetch enrolled courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, [])


    return (
        <div className='text-richblack-25 pt-[6rem] px-20'>
            <div><h1 className='text-4xl font-bold'>Enrolled Courses</h1></div>
            {
                !enrolledCourses ? (<div>No courses found</div>) : (
                    enrolledCourses.length > 0 ? (<div className='w-10/12 mx-auto mt-[2rem]'>
                        <div className='flex  mx-auto justify-between bg-richblack-800 px-4 rounded-md py-2'>
                            <p className='w-2/5 text-center'>Course Name</p>
                            <p className='w-1/5 text-center'>Duration</p>
                            <p className='w-1/5 text-center'>Progress</p>
                        </div>
                        <div className='flex flex-col gap-8 mt-[2rem]'>
                            {
                                enrolledCourses.map((course, index) => {
                                    return (
                                        <div key={index} className='flex justify-between items-center border-b-2 pb-[25px] border-richblack-700 rounded-md'>
                                            <div className='flex  w-2/5' onClick={() => navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/subSection/${course?.courseContent[0]?.subSection[0]?._id}`)}>
                                                    <div className='w-[80px] h-[40px] flex items-center '>
                                                        <img src={course.thumbnail} className='object-fit aspect-square '></img>
                                                    </div>
                                                    <div className='flex flex-col px-4'>
                                                        <p className='font-bold'>{course.title}</p>
                                                        <p className='text-sm text-richblack-900'>{course.description.length > 30 ? `${course.description.substring(0, 30)}...` : course.description}</p>

                                                    </div>
                                            </div>
                                            <div className=' w-1/5 flex justify-center'>
                                                {course?.totalDuration}
                                            </div>
                                            <div className='w-1/5 '>
                                                <ProgressBar 
                                                    completed={course.progressPercentage || 0}
                                                    height='16px'
                                                    width='100%'
                                                    isLabelVisible={true}
                                                    bgColor={"#0289a1"}
                                                    labelColor={"#111111"}
                                                    ></ProgressBar>
                                            </div> 
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>) : (<div>
                        You have not enrolled in any course yet.</div>)
                )
            }
        </div>
    )
}

export default EnrolledCourses