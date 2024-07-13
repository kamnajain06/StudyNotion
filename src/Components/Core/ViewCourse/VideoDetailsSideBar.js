import React, { useState, useEffect }  from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { FaBackward } from 'react-icons/fa';
import { IoMdArrowRoundBack } from "react-icons/io";
import { markLectureAsCompleted } from '../../../services/operations/courseDetailsApi';
import { setCompletedLectures } from '../../../slices/viewCourseSlice';


const VideoDetailsSideBar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] =  useState(null);
    const [activeVideo, setActiveVideo ] = useState(null);
    const [completedTopics, setCompletedTopics] = useState([]);

    const navigate = useNavigate();
    const { sectionId, subSectionId} = useParams();

    const location = useLocation();

    const {
        courseEntireData,
        courseSectionData,
        completedLectures,
        totalNoOfLectures,
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        ;(()=> {
            // console.log("CourseSectionData", courseSectionData);
            if(!courseSectionData.length) return;
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
            console.log("currentSectionIndex", currentSectionIndex);
            console.log("courseSectionData[currentSectionIndex]", courseSectionData[currentSectionIndex])
            const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            // set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // set current subsection here
            setActiveVideo(activeSubSectionId);
            // console.log("Lectures in number", totalNoOfLectures)
        })();
    },[courseSectionData, courseEntireData, location.pathname])

    // useEffect(() => {
    //     const completedLectures = courseEntireData?.completedLectures?.filter((data
    // })

  return (
    <div className='h-full w-1/5 fixed pt-[6rem] bg-[#0289a1] border-r border-richblue-400 text-richblue-800 text-sm font-bold'>
        <div className='px-5 flex items-center justify-between'>
            <div>
                <div className='font-bold text-2xl bg-richblack-900 text-richblack-5 flex px-2 py-1 aspect-square rounded-full items-center'><button onClick={() => navigate("/dashboard/enrolled-courses")}><IoMdArrowRoundBack /></button></div>
            </div>
            <div>
                <IconBtn
                text="Add Review"
                onClick={() => setReviewModal(true) }
                customClasses={"bg-yellow-50 px-4 py-2 rounded-md text-lg"}
                ></IconBtn>
            </div>
        </div>
        <div>
            <p className='text-xl px-5 mt-[1rem]'>{courseEntireData?.title}</p>
            <p className='px-5 text-richblue-400/90 text-start'>{completedLectures.length } / {totalNoOfLectures}</p>
        </div>
        {/* For sections and subsections */}
        <div className='mt-5'>
            {
                courseSectionData.map((section, index) => {
                    return (
                        <div onClick={() => setActiveStatus(section?._id)}
                        key={index}
                        className='border border-b-1 border-richblack-700'
                        >
                            <div className=''>
                                <p className='px-5 py-3 text-richblack-5 bg-richblack-600'>{section?.sectionName}</p>
                            </div>
                            <div className=' '>
                                {
                                    activeStatus === section?._id && <div className=''>
                                        {
                                            section?.subSection?.map((lecture, index) => {
                                                return (
                                                    <div
                                                    key={index}
                                                    onClick={() => {
                                                        navigate(`/view-course/${courseEntireData?._id}/section/${section._id}/subSection/${lecture._id}`)
                                                        setActiveVideo(lecture._id)
                                                    }}
                                                    className={`flex px-5 py-3 gap-2 ${activeVideo === lecture._id ? "bg-yellow-50 text-richblack-900" : "bg-richblue-900 text-richblack-5"}`}
                                                    >
                                                        <input type="checkbox"
                                                        checked={completedLectures.includes(lecture._id)}
                                                        onChange={()=> {}}
                                                        className=''
                                                        >
                                                        </input>
                                                        {
                                                            console.log("CompletedLectures", completedLectures)
                                                        }
                                                        <span>{lecture.title}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default VideoDetailsSideBar