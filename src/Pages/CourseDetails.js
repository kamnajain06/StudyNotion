import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/buyCourseApi';
import GetAvgRating from '../utils/getAvgRating';
import ConfirmationModal from '../Components/common/ConfirmationModal';
import RatingStars from '../Components/common/RatingStars';
import { FaInfoCircle } from 'react-icons/fa';
import { formattedDate } from '../utils/dateFormatter';
import { fetchCourseDetails, fetchOtherInstructorCourses } from '../services/operations/courseDetailsApi';
import { BiGlobe, BiWorld } from 'react-icons/bi';
import CourseDetailsCard from '../Components/Core/Course/CourseDetailsCard';
import { IoIosVideocam } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
import { FaAngleUp } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa';
import ReviewSlider from '../Components/common/ReviewSlider';
import CourseCard from '../Components/Core/CategoryPage/CourseCard';
import Footer from '../Components/common/Footer';
import { getAllRatingAndReviews, getRatingAndReviewCourse } from '../services/operations/ratingAndReviewApi';

const CourseDetails = () => {

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    const [courseData, setCourseData] = useState(null);
    const [reviewCards, setReviewCards] = useState([]);

    useEffect(() => {
        const getFullCourseDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId, token);
                console.log("Result", result)
                setCourseData(result);
                setReviewCards(result?.courseDetails?.ratingAndReviews);
            } catch (err) {
                console.log(err);
            }
        }
        getFullCourseDetails();
    }, [courseId]);

    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
        // console.log(courseData?.CourseDetails)
        const count = GetAvgRating(courseData?.CourseDetails?.ratingAndReviews);
        setAvgReviewCount(count);
    }, [courseData]);

    const [totalLectures, setTotalLectures] = useState(0);
    useEffect(() => {
        let lectures = 0;
        courseData?.courseDetails?.courseContent.forEach((sec) => {
            // console.log("subsec length", sec.subSection.length)
            lectures += sec.subSection.length || 0;
        })
        // console.log(lectures);
        setTotalLectures(lectures);
    }, [courseData])

    useEffect(() => {
        console.log("Course Data", courseData);
        window.scrollTo({ top: 0, behavior: 'instant' });
    },[courseData, courseId]);

    const [isActive, setIsActive] = useState([]);
    useEffect(()=> {
        // console.log("IsActive", isActive);
    },[isActive])

    const [instructorCourses, setInstructorCourses] = useState([]);
    useEffect(() => {
        const getInstructorCourses = async () => {
            const result = await fetchOtherInstructorCourses(courseId);
            // console.log("result of instrcutor courses", result)
            setInstructorCourses(result);
        };
        getInstructorCourses();
    },[courseData, courseId])

    const handleBuyCourse = async () => {
        // console.log("Course Id", courseId);
        // console.log("Course Id", [courseId]);
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "You are not Logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => {navigate("/login")},
            btn2Handler: () => {setConfirmationModal(null)}
        })

    }

    if (loading || !courseData) {
        return <div>Loading....</div>
    }

    if (!courseData.success) {
        return <div>Something went wrong</div>
    }
    console.log("ReviewCards", reviewCards);
    
    const {
        _id:course_id,
        title,
        description,
        courseContent,
        instructor,
        price,
        language,
        studentsEnrolled,
        instructions,
        learnings,
        createdAt,
        ratingAndReviews
    } = courseData?.courseDetails;

    // console.log("Course Details", courseData?.courseDetails);

    const date = formattedDate(createdAt);

    return (
        <div className=''>
            <div className='py-[4.5rem] relative flex bg-[#0289a1] justify-end text-richblue-800'>
                <div className='w-10/12 mx-auto flex flex-col gap-[7px] font-bold text-lg'>
                    <p className='text-[50px] font-bold mt-[30px]'>{title}</p>
                    <p className=' text-richblue-700 mt-[30px] mb-4 text-sm lg:max-w-[800px]'>{description}</p>
                    <div className='flex items-center gap-2'>
                        <span className='text-yellow-50'>{avgReviewCount || 0}</span>
                        <span><RatingStars Review_Count={avgReviewCount || 0}></RatingStars></span>
                        <span className='text-yellow-50'>({ratingAndReviews?.length} <span className=''>reviews</span>)</span>
                        <span> {studentsEnrolled?.length}   {studentsEnrolled?.length > 1 ? "students" : "student"} enrolled</span>
                    </div>
                    <p className='font-bold'>Created By: {instructor.firstName} {instructor.lastName}</p>
                    <p className='flex items-center gap-2'><FaInfoCircle></FaInfoCircle> Created on : {date} <BiGlobe></BiGlobe>{language}</p>
                </div>
                <div className='border rounded-lg absolute bg-richblue-600 right-20 top-30'>
                    <CourseDetailsCard 
                    course={courseData?.courseDetails}
                    setConfirmationModal={setConfirmationModal}
                    handleBuyCourse={handleBuyCourse}
                    ></CourseDetailsCard>
                </div>
            </div>
            <div className='w-2/4 text-richblack-5  ml-[120px] mt-[50px] p-4 border border-richblack-400 rounded-md'>
                <p className='text-3xl font-bold'>What you'll Learn</p>
                <p className='mt-[1rem] '>{learnings}</p>
            </div>

            <div className='text-richblack-5 w-1/2 ml-[120px] mt-[50px]'>
                <div>
                    <p className='text-3xl font-bold'>Course Content</p>
                </div>
                <div className='flex flex-row justify-between mt-[20px]'>
                    <div>
                        <span>{courseContent.length} section(s) </span>
                        <span>{totalLectures} lecture(s) </span> 
                        <span>{courseData?.totalDuration} total Length</span>
                    </div>
                    <button
                        onClick={() => setIsActive([])}>
                        <p className='text-yellow-50'>Collapse all Sections</p>
                    </button>
                </div>
                <div className='text-richblack-5 mt-[1rem]'>
                    {
                        courseContent?.map((section, index) => {
                            return (
                                <div key={index} className='border border-richblack-400'>
                                        <button onClick={() => {
                                            setIsActive(
                                                !isActive.includes(section._id) ? 
                                                isActive.concat(section._id) :
                                                isActive.filter((e) => e !== section._id)
                                            )
                                        }}
                                        className='bg-richblack-600 w-full text-start px-4 py-4 text-xl flex items-center gap-2  '
                                        >
                                            {
                                                isActive.includes(section._id) ?
                                                <FaAngleUp></FaAngleUp> :
                                                <FaAngleDown></FaAngleDown>
                                            }
                                            {section.sectionName}
                                        </button>
                                    <div className={`${isActive.includes(section._id) ? "flex flex-col gap-1" : "hidden"} bg-richblack-900 gap-5 px-4 py-4 font-bold`}>
                                        {
                                            section?.subSection?.map((sub, index)=> {
                                                return (
                                                    <div className='flex items-center gap-2 ' key={index}>
                                                        <div className='text-yellow-50'>
                                                            <IoIosVideocam />
                                                        </div>
                                                        {sub.title}
                                                    </div>
                                                )}
                                            )
                                        }
                                    </div>
                                </div>
                            )
                    })
                }
                </div>
                <div className='my-10 '>
                    <p className='text-3xl font-bold mb-4'>Author</p>
                    <div className='flex items-center '>
                        <img src={instructor?.image} alt="" className='w-[60px] h-[60px]  square-fit rounded-full'/>
                        <p className='flex px-2 text-lg text-caribbeangreen-200'>{`${instructor.firstName} ${instructor.lastName}`}</p>
                    </div>
                    <div className='mt-4 text-richblack-25'>
                        {instructor?.additionalDetails?.about}
                    </div>
                </div>
            </div>
            <div className='w-10/12 mx-auto items-center'>
                {
                    ratingAndReviews?.length > 0 && <div>
                        <p className='text-3xl font-bold my-10 text-richblack-5'>Reviews from Other Learners</p>
                        <ReviewSlider cards={reviewCards}></ReviewSlider>
                    </div> 
                }
            </div>
            <div className='w-10/12 mx-auto'>
                {/* {
                    console.log("length", instructorCourses?.length)
                } */}
                {
                    instructorCourses?.length > 1 && <div>
                        <p className='text-3xl font-bold text-richblack-5 my-10'>Other Courses by {instructor?.firstName} {instructor?.lastName}</p>
                        <div className='grid lg:grid-cols-3 gap-5 border'>
                            {
                                instructorCourses.map((course) => {
                                    return (
                                        <CourseCard course={course}></CourseCard>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
            <Footer></Footer>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>}            
        </div>
    )
}

export default CourseDetails