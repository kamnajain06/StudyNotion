import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsApi';

const PublishForm = () => {
  const { register, handleSubmit, errors,
    getValues,
    setValue,
   } = useForm();

   const [loading, setLoading] = useState(false);
   const { token } = useSelector((state) => state.auth)
   const { course } = useSelector((state) => state.course)
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
    if(course?.status === COURSE_STATUS.PUBLISHED){
      setValue("public", true);
    }
   },[])

   const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
   }

   const handleCoursePublish = async () => {
      if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true || 
    course?.status === COURSE_STATUS.DRAFT && getValues("public") === false) {
      // No updation
      goToCourses();
      return;

    }

      const formData = new FormData();
      formData.append("courseId", course._id);
      const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
      formData.append("status", courseStatus);

      setLoading(true);

      const result = await editCourseDetails(formData, token);

      if(result){
        goToCourses();
      }
      setLoading(false);
   }

   const onSubmit = (data) => {
    handleCoursePublish();
   }
   const goBack = () => {
    dispatch(setStep(2));
   }
  return (
    <div className='text-richblack-50 mt-6 bg-richblack-800 p-4 rounded-md w-3/4 mx-auto'>
      <p className='text-2xl mb-4'>Publish Settings</p>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='flex gap-2 text-md items-center'>
          <label htmlFor='public'>Mark this course as Public</label>
          <input
          type="checkbox"
          id="public"
          name="public"
          {...register("public")}
          className='text-lg'
          ></input>
          </div>
          <div className='flex gap-3 justify-end'>
            <button
            disabled={loading}
            onClick={() => goBack()}
            className='bg-richblack-600 text-white px-4 py-2 rounded-md'
            >
              Back
            </button>
            <IconBtn
            text='Save Changes'
            customClasses={"bg-yellow-200 text-richblack-800 px-4 py-2 rounded-md font-bold"}
            >
            </IconBtn>
          </div>
      </form>

    </div>
  )
}


export default PublishForm;