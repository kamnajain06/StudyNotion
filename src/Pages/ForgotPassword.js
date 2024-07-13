import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authApi';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const {loading} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const submitHandler = (e)=> {
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }   
  return (
    <div className='flex justify-center item-center w-screen h-screen text-white '>   
        {
            loading ? 
            (<div>Loading...</div>) 
            :
            (<div className='flex justify-center items-center w-1/4'>
                {
                    !emailSent ? 
                    (
                        <div className='flex flex-col w-full'>
                            <div className='text-3xl font-bold  '><h1>Reset Password</h1></div>
                            <div className='text-richblack-300 my-[20px]'>Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</div>
                            <form onSubmit={submitHandler} className='flex flex-col items-start w-full '>
                                <label className='w-full'>
                                    <p className='text-xs mb-[5px]'>Email Address <span className='text-pink-300'>*</span></p>
                                    <input
                                    className='rounded p-[5px] w-full text-black '
                                    required
                                    type='text'
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    placeholder='Enter your Email'></input>
                                </label>
                                <button type='submit' className='mt-[20px] w-full bg-yellow-100 text-black rounded p-[5px] '>
                                    Reset Button
                                </button>
                                <Link to='/login' className='flex items-center gap-x-1 mt-[10px] text-sm'><span><FaArrowLeft/></span>Back to Login </Link>
                            </form>
                        </div>
                    )
                    : (
                        <div className='flex flex-col w-full'>
                            <div className='text-3xl font-bold  '><h1>Resend Email</h1></div>
                            <div className='text-richblack-300 my-[20px]'>We've sent the reset email to {email}</div>
                            <form onSubmit={submitHandler}>
                                <button type='submit' className='mt-[10px] w-full bg-yellow-100 text-black rounded p-[5px] '>
                                    Resend Email
                                </button>
                                <Link to='/login' className='flex items-center gap-x-1 mt-[10px] text-sm'><span><FaArrowLeft/></span>Back to Login</Link>
                            </form>
                        </div>
                    )
                }
            </div>)
        }
    </div>
  )
}

export default ForgotPassword