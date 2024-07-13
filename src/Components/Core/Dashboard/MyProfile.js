import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { BiSolidEdit } from "react-icons/bi";
import { getProfile } from '../../../services/operations/profileAPI';
import { useEffect } from 'react';


const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className='w-full h-full flex flex-col py-[6rem] text-richblack-5 -z-1 '>
            <div className='flex flex-col px-20'>
                <h1 className='text-3xl'>My Profile</h1>
                <div className='flex flex-col gap-14 mt-[40px]'>
                    <div className='relative flex flex-row justify-between bg-[#0289a1] p-10 rounded-lg shadow-lg text-richblue-800 '>
                        <div className='flex flex-row items-center gap-2 font-bold'>
                            <div className='w-16'><img src={user.image} alt={`profile-${user?.firstName}`} className='rounded-full border border-white'></img></div>
                            <div>
                                <div>{user.firstName}{" "}{user.lastName}</div>
                                <div>{user.email}</div>
                            </div>
                        </div>
                        <IconBtn
                            text={"Edit"}
                            onClick={() => navigate("/dashboard/settings")}
                            customClasses={"absolute top-8 right-8 bg-yellow-200 py-2 px-4 rounded-md font-bold flex flex-row items-center gap-1"}
                        >
                            <BiSolidEdit />
                        </IconBtn>
                    </div>
                    <div className='relative flex flex-col gap-6  font-bold bg-[#0289a1] p-10 rounded-lg shadow-lg text-richblue-800 '>
                        <div className='flex flex-row justify-between'>
                            <h1 className='text-2xl'>About</h1>
                        </div>
                        {
                            console.log(user?.additionalDetails?.about)
                        }
                        <div className='font-normal'>
                            {
                                user?.additionalDetails?.about ? (<div>
                                    {user?.additionalDetails?.about}
                                </div>) : (<div>Write something about yourself</div>)
                            }
                        </div>
                        <div>
                            <span>Account Type: {user?.accountType}</span>
                        </div>
                        <IconBtn
                            text={"Edit"}
                            onClick={() => navigate("/dashboard/settings")}
                            customClasses={"top-8 right-8 absolute bg-yellow-200  px-4 py-2 rounded-md font-bold flex flex-row items-center gap-2"}>
                            <BiSolidEdit />
                        </IconBtn>
                    </div>
                    <div className='relative flex flex-col gap-10  font-bold bg-[#0289a1] p-10 rounded-lg shadow-lg text-richblue-800 '>
                        <div className='text-2xl'>Personal Details</div>
                        <div className='flex flex-row gap-24'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col text-sm'>
                                    <div className='font-normal text-sm'>
                                        First Name
                                    </div>
                                    <div>
                                        {user?.firstName}
                                    </div>
                                </div>
                                <div className='flex flex-col text-sm'>
                                    <div className='font-normal text-sm '>
                                        Email
                                    </div>
                                    <div>
                                        {user?.email}
                                    </div>
                                </div>
                                <div className='flex flex-col text-sm'>
                                    <div className='font-normal text-sm '>
                                        Gender
                                    </div>
                                    <div>
                                        {user?.additionalDetails?.gender ?? "Add Gender"}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col text-sm'>
                                    <div className='font-normal text-sm'>
                                        Last Name
                                    </div>
                                    <div>
                                        {user?.lastName}
                                    </div>
                                </div>
                                <div className='flex flex-col text-sm'>
                                    <div className='font-normal text-sm'>
                                        Phone Number
                                    </div>
                                    <div>
                                        {user?.additionalDetails?.phoneNumber.length > 1 ? user?.additionalDetails?.phoneNumber : "Add Contact Number"}
                                    </div>
                                </div>
                                <div className='flex flex-col text-sm'>
                                    <div className='font-normal text-sm'>
                                        Date of Birth
                                    </div>
                                    <div>
                                        {user?.additionalDetails?.dateOfBirth ? user?.additionalDetails?.dateOfBirth : "Add Date of Birth"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <IconBtn
                            text={"Edit"}
                            onClick={() => navigate("/dashboard/settings")}
                            customClasses={"top-8 right-8 absolute bg-yellow-200  px-4 py-2 rounded-md font-bold flex flex-row items-center gap-2"}>
                            <BiSolidEdit />
                        </IconBtn>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyProfile