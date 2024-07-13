import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../../services/operations/profileAPI'
import { getProfile } from '../../../../services/operations/profileAPI'

const UpdateProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSucessful },
    } = useForm();

    useEffect(() => {
        if (isSubmitSucessful) {
            reset({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                about:"",
                gender:"",
                dateOfBirth:"",
            })
        }
    }, [reset,isSubmitSucessful]);

    const submitForm = (data) => {
        console.log(data);
        dispatch(updateProfile(token, data));
    }
    return (
        <div className='w-full'>
            <div className='text-2xl'>Profile Information</div>
            <form onSubmit={handleSubmit(submitForm)} className='font-normal '>
                <div className='w-full flex flex-row items-center gap-10 '>
                    <div className='flex flex-col gap-2 w-[50%]'>
                        <div className='flex flex-col gap-1 '>
                            <label className='text-sm'>First Name</label>
                            <input
                                type="text"
                                {...register('firstName', { maxLength: 20 })}
                                defaultValue={user?.firstName}
                                name='firstName'
                                id='firstName'
                                className='px-2 bg-richblue-700 text-richblue-25 border-b-4 border-richblue-100 py-2 rounded-md '
                            />
                            {errors.firstName && <p className="text-sm text-pink-500">Please enter your First name</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm'>Date of Birth</label>
                            <input
                                type="date"
                                {...register('dateOfBirth', {
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    },
                                })}
                                defaultValue={user?.dateOfBirth}
                                name='dateOfBirth'
                                id='dateOfBirth'
                                className='px-2 bg-richblue-700 text-richblue-25 border-b-4 border-richblue-100 py-2 rounded-md '
                            />
                            {errors.dateOfBirth && <p className="text-sm text-pink-500">Please enter your Date of Birth</p>}

                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm'>Contact Number</label>
                            <input
                                type="tel"
                                {...register('phoneNumber', {
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Invalid contact number",
                                    }
                                })}
                                defaultValue={user?.additionalDetails?.phoneNumber}
                                placeholder='9282292922'
                                name='phoneNumber'
                                id='phoneNumber'
                                className='px-2 bg-richblue-700 text-richblue-25 border-b-4 border-richblue-100 py-2 rounded-md '
                            />
                            {errors.phoneNumber && <p className="text-sm text-pink-500">Please enter Contact Number</p>}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-[50%] mt-[1rem]'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm'>Last Name</label>
                            <input
                                type="text"
                                {...register('lastName', { maxLength: 20 })}
                                defaultValue={user?.lastName}
                                name='lastName'
                                id='lastName'
                                className='px-2 bg-richblue-700 text-richblue-25 border-b-4 border-richblue-100 py-2 rounded-md '
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm'>Gender</label>
                            <select
                                {...register('gender')}
                                defaultValue={user?.additionalDetails?.gender}
                                name='gender'
                                id='gender'
                                className='px-2 bg-richblue-700 text-richblue-25 border-b-4 border-richblue-100 py-2 rounded-md '
                            >
                                <option value="">{user?.additionalDetails?.gender ?? "Prefer not to say"}</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm'>About</label>
                            <textarea
                                {...register('about')}
                                defaultValue={user?.additionalDetails?.about}
                                name='about'
                                id='about'
                                placeholder='Enter Bio Details'
                                className='px-2 bg-richblue-700 text-richblue-25 border-b-4 border-richblue-100 py-2 rounded-md '
                            />
                        </div>
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
            </form >
        </div >
    )
}

export default UpdateProfile