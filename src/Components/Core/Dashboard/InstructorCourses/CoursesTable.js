import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import { COURSE_STATUS } from '../../../../utils/constants';
import { FaCheck, FaClock } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse } from '../../../../services/operations/courseDetailsApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CoursesTable = ({ courses, setCourses }) => {

    function formatDateAndTime(dateTimeString) {
        // Parse the ISO 8601 string into a Date object
        let dateTime = new Date(dateTimeString);

        // Convert UTC to local timezone
        let localDateTime = new Date(dateTime.getTime() + dateTime.getTimezoneOffset() * 60000);

        // Format date as YYYY-MM-DD
        let date = localDateTime.toISOString().split('T')[0];

        // Format time in 12-hour format with AM/PM
        let hours = localDateTime.getHours();
        let minutes = localDateTime.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours) as 12 AM

        let formattedTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;

        // Combine date and formatted time
        return `${date} | ${formattedTime}`;
    }
    const [ confirmationModal, setConfirmationModal] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
    const handleDeleteCourse = async (courseId) => {
        console.log("course id", courseId);
        setLoading(true);
        try{
            const response = await deleteCourse({courseId}, token);
            if(response){
                console.log("Response", response);
                setCourses(response);
            }

        }catch(err){
            console.log("Error", err);
        }
        setConfirmationModal(null);
        setLoading(false);
    }

    return (
        <div className='text-richblack-5 mt-[4rem] w-10/12 mx-auto'>
            <Table className='w-full'>
                <Thead >
                    <Tr className="flex gap-x-10 border border-richblack-500 rounded-md bg-richblack-800">
                        <Th className='text-center w-[60%]'>Course</Th>
                        <Th className='text-end  w-[15%]'>Duration</Th>
                        <Th className='translate-x-4 w-[15%]'>Price</Th>
                        <Th className='-translate-x-3 w-[15%]'>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody className="w-full ">
                    {
                        courses.length === 0 ? (<div>No Courses Found</div>):
                        (
                            <div className='py-10 w-full '>
                                {
                                    courses.map((course, index) => (
                                        <Tr key={index} className=" w-full flex mb-12 border-b-[1px] rounded-md border-richblack-500 pb-5">
                                            <td className='flex flex-row gap-4 w-[60%]'>
                                                <img src={course.thumbnail}
                                                alt={course.title}
                                                className='w-[8rem] h-[7rem] rounded-md object-fit'
                                                ></img>
                                                <div className='flex flex-col gap-6 pt-1'>
                                                    <div>
                                                        <p className='text-richblack-5'>{course.title}</p>
                                                        <p className='text-richblack-5 text-sm'>{
                                                        course.description.length > 30 ? (
                                                            course.description.substring(0, 30) + '...'
                                                        ) : (course.description)}</p>
                                                    </div>
                                                    <div>
                                                        <p className='text-sm'>Created: {formatDateAndTime(course.createdAt)}</p>
                                                        <div className=' w-min text-[10px] font-bold text-richblack-800 '>
                                                            {
                                                                course.status === COURSE_STATUS.DRAFT ?  ( <p className=' rounded-md flex px-1 items-center gap-1 bg-yellow-300 border'><FaClock></FaClock>Draft</p>) : 
                                                                ( <p className='rounded-md flex px-1 items-center gap-1 border bg-caribbeangreen-400'><FaCheck></FaCheck>Published</p>)
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center w-[15%]'>
                                                <p className='text-richblack-5'>course.duration</p>
                                            </td>
                                            <td className='text-center w-[15%] '>
                                                <p className='text-richblack-5'>Rs. {course.price}/-</p>
                                            </td>
                                            <td className='text-center w-[15%]'>
                                                <div className='flex justify-center'>
                                                    <button className='bg-richblack-5 text-richblack-800 px-2 py-1 rounded-md
                                                    hover:bg-richblack-4'
                                                    onClick={() => {
                                                        navigate(`courses/edit-course/${course._id}`)
                                                    }}
                                                    >
                                                        <FaEdit></FaEdit>
                                                    </button>
                                                    <button className='bg-red-500 text-white px-2 py-1 rounded-md
                                                    hover:bg-red-400 ml-2'
                                                    onClick={() => {
                                                        setConfirmationModal({
                                                            text1:"Are you sure you want to delete this course ?",
                                                            text2:"All the lectures will be deleted.",
                                                            btn1Text: "Delete",
                                                            btn2Text:"Cancel",
                                                            btn1Handler: !loading ? () => handleDeleteCourse(course._id) : setConfirmationModal(null),
                                                            btn2Handler:() => setConfirmationModal(null)
                                                        })
                                                    }}
                                                    >
                                                        <FaTrash></FaTrash>
                                                    </button>
                                                </div>
                                            </td>
                                        </Tr>
                                    ))
                                }
                            </div>
                        )
                    }
                </Tbody>
            </Table>
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>
            }
        </div>
    )
}

export default CoursesTable;

    // < table >
    //             <thead>
    //                 <tr className=''>
    //                     <th>Courses</th>
    //                     <th>Course Duration</th>
    //                     <th>Course Price</th>
    //                     <th>Course Actions</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {courses.map((course, index) => (
    //                     <tr key={index}>
    //                         <td>{course.thumbnail}</td>
    //                         <div>
    //                             <td>{course.title}</td>
    //                             <td>{course.duration}</td>
    //                             <td>Created : {formatDateAndTime(course.createdAt)}</td>
    //                             <td>{course.status}</td>
    //                         </div>
    //                         <td>
    //                             {course.duration}
    //                         </td>
    //                         <td>
    //                             {course.price}
    //                         </td>
    //                         <td>
    //                             <div>
    //                                 <button className='bg-richblack-5 text-white rounded-md px-2 py-1
    //                                 hover:bg-richblack-4'><MdEdit></MdEdit></button>
    //                                 <button className='bg-richblack-5 text-white rounded-md px-2 py-1
    //                                 hover:bg-richblack-4 ml-2'>
    //                                     <MdDelete></MdDelete>
    //                                 </button>
    //                             </div>
    //                         </td>
                            

    //                     </tr>
    //                     ))}
    //             </tbody>
    //         </table >
