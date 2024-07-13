import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../slices/authSlice';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsApi';
import IconBtn from '../../common/IconBtn';
import { FaPlus } from 'react-icons/fa6';
import CoursesTable from './InstructorCourses/CoursesTable';
const MyCourses = () => {

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    setLoading(true);
    try {
      const res = await fetchInstructorCourses(token);
      setCourses(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    
    getCourses();
    
  }, [])


  return (
    <div className='text-richblack-5 mt-[7rem]'>
      <div className='w-11/12 mx-auto'>
        <div className='flex flex-row justify-between'>
          <p className='text-3xl'>My Courses</p>
          <IconBtn
            text="Add Course"
            onClick={() => navigate("/dashboard/add-course")}
            customClasses={"flex flex-row gap-2 items-center bg-yellow-200 rounded-md text-richblack-800 font-bold px-4 py-2"}
          >
            <FaPlus></FaPlus>
          </IconBtn>
        </div>
        {
          courses && <CoursesTable courses={courses} setCourses={setCourses}></CoursesTable>
        }
      </div>
    </div>
  )
}

export default MyCourses