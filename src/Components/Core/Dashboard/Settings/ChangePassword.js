import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../../services/operations/authApi';
import { useDispatch, useSelector } from 'react-redux';


const ChangePassword = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const submitHandler = async (data) => {
    console.log(data);
    try {
      await dispatch(changePassword(token, data));
      console.log("done");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(
        {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }
      )
    }
  }, [isSubmitSuccessful, reset])

  return (
    <div className='w-full'>
      <h1 className='text-2xl'>Change Password</h1>
      <div className='w-full mt-[1.5rem]'>
        <form className='w-full' onSubmit={handleSubmit(submitHandler)}>
          <div className='flex flex-row justify-between gap-10 w-full'>
            <div className='relative -z-1 flex flex-col w-full gap-1'>
              <label className='font-normal text-sm'>Current Password<sup className="text-pink-200">*</sup></label>
              <input
                type={showPassword ? "text" : "password"}
                className=' px-2 bg-richblue-700 text-richblue-25 border-b-4 border-richblue-100 py-2 rounded-md '
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-8 z-2 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            <div className='relative -z-1 flex flex-col w-full gap-1'>
              <label className='font-normal text-sm'>New Password<sup className="text-pink-200">*</sup></label>
              <input
                type={showNewPassword ? "text" : "password"}
                className='px-2 bg-richblue-700 text-richblue-25 border-b-4 border-richblue-100 py-2 rounded-md '
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-2 top-8 z-2 cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            <div className='relative -z-1 flex flex-col w-full gap-1'>
              <label className='font-normal text-sm'>Confirm Password<sup className="text-pink-200">*</sup></label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className='px-2 bg-richblue-700 text-richblue-25 border-b-4 border-richblue-100 py-2 rounded-md '
                {...register("confirmPassword", { required: true })}
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-8 z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
          </div>
          <div className='flex flex-row gap-2 justify-end mt-8 font-bold'>
            <button onClick={() => navigate('/dashboard/my-profile')} className='bg-richblack-600 text-richblack-25 py-2 px-4 rounded-md'>
              Cancel
            </button>
            <button type='submit' className='bg-yellow-200 py-2 px-4 rounded-md'>
              Save
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default ChangePassword