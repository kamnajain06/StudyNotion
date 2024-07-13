import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { sendOtp, signup } from '../services/operations/authApi';

const VerifyEmail = () => {
  const {loading,signupData} = useSelector((state)=> state.auth);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  const submitHandler = (e) => {
    e.preventDefault();
    if(signupData === null){
      return toast.error("No Data");
    }
    const {firstName, lastName, email, password, confirmPassword, accountType} = signupData;
    dispatch(signup(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate));
  }


  return (
    <div className='w-screen h-screen flex items-center justify-center '>
      {
        loading ? (
          toast("Loading...")
        ):(
          <div className='flex flex-col items-center justify-center w-1/4  text-white gap-y-10 '>
            <div className='text-3xl'><h1>Verify Email</h1></div>
            <div>A Verification Code has been sent to you. Enter the code below </div>
            <form onSubmit={submitHandler} className='flex flex-col w-full justify-center items-center'>
              <OtpInput
              containerStyle={"gap-x-4 text-3xl text-black "}
              value ={otp}
              onChange={setOtp}
              numInputs={6}
              inputType='tel'
              renderInput={(props) => <input {...props} />}></OtpInput>
              <button type='submit' className='mt-[20px] w-full bg-yellow-100 text-black rounded p-[5px] '>Verify Email</button>
            </form>
            <div className='flex flex-row justify-between items-center w-full'>
              <div><Link to='/login' className='flex items-center gap-x-1 text-sm'><span><FaArrowLeft/></span>Back to Login</Link></div>
              <button onClick={()=>dispatch(sendOtp(signupData.email,navigate))} className='hover:text-blue-100 text-sm cursor-pointer '>Resend it </button> 
            </div>
          </div>
        )
      }
    </div>
  )
}

export default VerifyEmail