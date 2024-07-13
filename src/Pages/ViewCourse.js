import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchViewCourseDetails } from '../services/operations/courseDetailsApi';
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import { useParams } from 'react-router-dom';
import VideoDetailsSideBar from '../Components/Core/ViewCourse/VideoDetailsSideBar';
import { useNavigate } from 'react-router-dom';
import CourseReviewModal from '../Components/Core/ViewCourse/CourseReviewModal';
import { Outlet } from 'react-router-dom';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(null);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { totalNoOfLectures } = useSelector((state) => state.viewCourse)

    useEffect(() => {
        const getCourseDetails = async () => {
            // console.log("View Course", courseId);
            const result = await fetchViewCourseDetails(courseId, token);
            console.log(result);
            dispatch(setCourseSectionData(result.courseDetails.courseContent));
            dispatch(setCourseEntireData(result.courseDetails));
            dispatch(setCompletedLectures(result.completedVideos));
            let lectures = 0;
            result?.courseDetails?.courseContent?.forEach((section) => {
                lectures += section?.subSection?.length;
            });
            dispatch(setTotalNoOfLectures(lectures));
            // console.log("Total Lectures", totalNoOfLectures);
        }
        getCourseDetails();
    },[courseId])
    return (
        <div className='flex '>
            <div className='w-1/5 '>
                <VideoDetailsSideBar setReviewModal={setReviewModal}></VideoDetailsSideBar>
            </div>
            <div className='w-4/5 '>
                <Outlet></Outlet>
            </div>
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}></CourseReviewModal>}
        </div>
    )
}

export default ViewCourse