import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';
import IconBtn from '../../common/IconBtn';
import { markLectureAsCompleted } from '../../../services/operations/courseDetailsApi';

const VideoDetails = () => {

    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const player = useRef();
    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse);

    const [videoData, setVideoData] = useState([]);
    const [videoEnded , setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const setVideoSpecificDetails = async () => {
            if(!courseSectionData.length) return;
            if(!courseId && !sectionId && !subSectionId) navigate("/dashboard/enrolled-courses");

            const filteredData = courseSectionData?.filter((section) => section._id === sectionId);
            const filteredVideoData = filteredData[0]?.subSection?.filter((lecture) => lecture._id === subSectionId);
            // console.log("filteredVideoData",filteredVideoData);
            setVideoData(filteredVideoData? filteredVideoData[0] : []);
            setVideoEnded(false);
        }
        setVideoSpecificDetails();
    },[courseSectionData, courseEntireData, location.pathname, videoData])

    useEffect(() => {

    })

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data)=> data._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data)=> data._id === subSectionId);

        if(currentSectionIndex === 0 && currentSubSectionIndex === 0) return true;
        return false;
    }
    const isLastVideo = () => {
        // console.log("courseSectionData", courseSectionData)
        const currentSectionIndex = courseSectionData.findIndex((data)=> data._id === sectionId);
        // console.log("currentSectionIndex", currentSectionIndex);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data)=>data._id === subSectionId);
        // console.log("currentSubSectionIndex", currentSubSectionIndex);
        const noOfSections = courseSectionData.length;
        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        if(currentSectionIndex === noOfSections - 1 && currentSubSectionIndex === noOfSubSections - 1) return true;
        return false;
    }
    const goToNextVideo = () => {
        // console.log("courseSectionData", courseSectionData);
        const currentSectionIndex = courseSectionData?.findIndex((data)=> data._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data)=>data._id === subSectionId);
        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;

        if(currentSubSectionIndex !== noOfSubSections - 1){
            const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex + 1]?._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${nextSubSectionId}`);
        }else{
            const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id;
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1]?.subSection[0]?._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/subSection/${nextSubSectionId}`);
        }
    }
    const goToPreviousVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex((data)=> data._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex((data)=>data?._id === subSectionId);
        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;

        if(currentSubSectionIndex !== 0){
            const previousSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex- 1]?._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${previousSubSectionId}`);
        }else{
            const previousSectionId = courseSectionData[currentSectionIndex - 1]?._id;
            const previousSubSectionId = courseSectionData[currentSectionIndex - 1]?.subSection[noOfSubSections - 1]?._id;
            navigate(`/view-course/${courseId}/section/${previousSectionId}/subSection/${previousSubSectionId}`);
        }

    }
    const handleLectureCompletion = async () => {
        setLoading(true);
        const result = await markLectureAsCompleted({
            courseId:courseId,
            subSectionId:subSectionId
        }, token);
        // update state
        console.log("Result", result)
        if(result){
            dispatch(updateCompletedLectures(result.completedVideos));
        }
        setLoading(false);
    }

  return (
    <div>
        {
            !videoData ? (<div>No Data Found </div>) : (
                <div className='mt-[4rem] w-full px-3 -z-1 relative'>
                    <Player
                    ref={player}
                    src={videoData?.videoUrl}
                    onEnded={() => setVideoEnded(true)}
                    aspectRatio="16:9"
                    playsInline
                >
                    <BigPlayButton position="center" />
                    {
                        videoEnded && (
                            <div className='flex flex-col gap-3 absolute w-full h-full justify-center top-[0.1px] bg-black bg-opacity-80 items-center z-[100] backdrop-blur-md'>
                                {
                                    !completedLectures.includes(subSectionId) && (
                                        <div>
                                            <IconBtn
                                            disabled={loading}
                                            onClick={() => handleLectureCompletion()}
                                            text={!loading ? "Mark as Completed" : "Loading..."}
                                            customClasses={"bg-yellow-50 px-4 py-2 rounded-md text-richblack-900 text-lg font-bold"}
                                            ></IconBtn>
                                        </div>
                                    )
                                }
                                <IconBtn
                                disabled={loading}
                                onClick={() => {
                                    if(player?.current?.seek(0));
                                    setVideoEnded(false);
                                }}
                                customClasses={"bg-yellow-50 px-4 py-2 rounded-md text-richblack-900 text-lg font-bold w-[100px]"}
                                text = "Rewatch"
                                ></IconBtn>
                                <div className='text-lg text-richblack-5 flex gap-5 '>
                                    {
                                        !isFirstVideo() && <button
                                        disabled={loading}
                                        onClick={() => goToPreviousVideo()}
                                        className='text-richblack-900 text-lg bg-richblack-300 px-4 py-2 rounded-md font-bold'
                                        >
                                            Prev
                                        </button>
                                    }
                                    {
                                        !isLastVideo() && <button
                                        disabled={loading}
                                        onClick={() => goToNextVideo()}
                                        className='text-richblack-900 text-lg bg-yellow-50 px-4 py-2 rounded-md font-bold'
                                        >
                                            Next
                                            </button>
                                    }
                                </div>
                            </div>
                        )
                    }
                    </Player>
                </div>
            )
        }
        <div className='text-richblack-5 px-5 mt-[1rem] py-5 '>
            <h1 className='text-3xl font-bold'>{videoData.title}</h1>
            <h2 className='text-sm'>{videoData.description}</h2>
        </div>
    </div>
  )
}

export default VideoDetails