import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/operations/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const token = location.pathname.split("/").at(-1);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:"",
    })

    const handleOnChange = (e) => {
        setFormData((prevData)=> ({
            ...prevData,
            [e.target.name] : e.target.value,
        }) )
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword){
            return toast.error("Passwords do not match")
        }
        dispatch(resetPassword(formData,token, navigate));
    }
  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center text-white '>
        <div className='w-1/4'>
        <div className='text-3xl font-bold'>
            <h1 >Choose new Password</h1>
        </div>
        <div className='text-richblack-300 my-[10px]'>
            Almost done. Enter your new password and you're all set.
        </div>  
        <form onSubmit={handleOnSubmit}>
            <label className='relative'>
                <p className='text-sm mb-[5px]'>New Password <sup className='text-pink-300'>*</sup></p>
                <input
                type={showPassword ? "text":"password"}
                name="password"
                value={formData.password}
                placeholder='Enter New Password'
                onChange={handleOnChange}
                className='rounded p-[5px] w-full text-black '
                ></input>
                <span onClick={() => setShowPassword((prev)=> !prev)} className='absolute text-black right-[10px] bottom-[2px] cursor-pointer'>
                    {
                        showPassword ? (<IoMdEyeOff />):(<IoMdEye />)
                    }
                </span>
            </label>
            <label className='relative'>
                <p className='mt-[10px] text-sm mb-[5px]'>Confirm new Password <sup className='text-pink-300'>*</sup></p>
                <input
                type={confirmPassword ? "text":"password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder='Enter New Password'
                onChange={handleOnChange}
                className='rounded p-[5px] w-full text-black '
                ></input>
                <span onClick={() => setConfirmPassword((prev)=> !prev)} className='absolute text-black right-[10px] bottom-[2px] cursor-pointer'>
                    {
                        confirmPassword ? (<IoMdEyeOff />):(<IoMdEye />)
                    }
                </span>
            </label>
            <button type='submit' className='mt-[20px] w-full bg-yellow-100 text-black rounded p-[5px] '>Reset Password</button>
        </form>  
        <Link to='/login' className='flex items-center gap-x-1 mt-[10px] text-sm'><span><FaArrowLeft/></span>Back to Login</Link>
        </div>    
    </div>
  )
}

export default UpdatePassword