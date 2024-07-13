import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsApi';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const Instructor = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile)

    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        const getCourseDataWithStacks = async () => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            // console.log("instructorApiData", instructorApiData?.data);
            const result = await fetchInstructorCourses(token);
            // console.log("result", result);
            if (instructorApiData) {
                setInstructorData(instructorApiData?.data);
            }
            if (result) {
                setCourseData(result);
            }
            setLoading(false);
        }
        getCourseDataWithStacks();
    }, []);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);
    return (
        <div className='mt-[6rem] text-richblack-5 w-9/12 mx-auto my-10'>
            <div>
                <p className='font-bold text-xl'>Hi! {user.firstName} 👋🏻</p>
                <p className='text-richblack-400 text-sm mb-4'>Let's start something new</p>
            </div>
            {
                loading ? (<div className='spinner'></div>) : (
                    courseData?.length > 0 ? (
                        <div>
                            <div className='flex justify-between gap-4'>
                                <div className='w-3/4 bg-richblack-800 px-4 py-4'>
                                    <InstructorChart courses={instructorData}></InstructorChart>
                                </div>
                                <div className='w-1/4 bg-richblack-800  px-4 py-4'>
                                    <p className='text-lg font-bold'>Statistics</p>
                                    <div className='mt-[1rem]'>
                                        <p className='text-richblack-300 '>Total Courses</p>
                                        <p className='text-start font-bold text-xl'>{courseData.length}</p>
                                    </div>
                                    <div className='mt-[1rem]'>
                                        <p className='text-richblack-300 '>Total Students</p>
                                        <p className='text-start font-bold text-xl'>{totalStudents}</p>
                                    </div>
                                    <div className='mt-[1rem]'>
                                        <p className='text-richblack-300 '>Total Amount</p>
                                        <p className='text-start font-bold text-xl'>Rs. {totalAmount}/-</p>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 bg-richblack-800 px-4 py-4'>
                                {/* Render 3 courses */}
                                <div className='flex justify-between'>
                                    <p className='text-xl font-bold '>Your Courses</p>
                                    <Link to="/dashboard/my-courses">
                                    <p className='text-yellow-50'>View All</p>
                                    </Link>
                                </div>
                                <div className='flex flex-row gap-4 justify-between mt-4'>
                                    {
                                        courseData.slice(0,3).map((course)=> {
                                            return (
                                                <div className='w-[300px] h-[250px] bg-richblack-700'>
                                                    <img src={course.thumbnail} className='aspect-square w-[300px] h-[200px]'></img>
                                                    <div className=' px-2 '>
                                                        <p>{course.title}</p>
                                                    </div>
                                                    <div className=' px-2 pb-2 '>
                                                        <p>{course?.studentsEnrolled?.length} <span className='text-sm text-richblack-200'>students enrolled</span> | Rs. {course.price}/-</p>
                                                        </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (<div>
                        <p>You have not created any courses yet</p>
                        <Link to="/dashboard/add-course">
                            <button>Create Course</button>
                        </Link>
                    </div>)
                )
            }
        </div>
    )
}

export default Instructor