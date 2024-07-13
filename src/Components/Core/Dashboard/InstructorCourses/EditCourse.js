import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../CreateCourse/RenderSteps';
import { fetchCourseDetails } from '../../../../services/operations/courseDetailsApi';
import { setEditCourse } from '../../../../slices/courseSlice';
import { setCourse } from '../../../../slices/courseSlice';
import { setLoading } from '../../../../slices/authSlice';

const EditCourse = () => {

    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const getCourses = async () => {
            setLoading(true);
            const result = await fetchCourseDetails(courseId, token);
            if(result){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result.courseDetails));
            }
            setLoading(false);
        }
        getCourses();
    },[])

    useEffect(() => {
        // console.log("Course", course);
    }, [course]);


  return (
    <div className='text-richblack-5 mt-[6rem]'>
        <h1 className='text-3xl'>Edit Course</h1>
        <div className='w-6/12 mx-auto'>
            {
                course ? <RenderSteps></RenderSteps>  : <h1>Course not found</h1>
            }
        </div>
    </div>
  )
}

export default EditCourse