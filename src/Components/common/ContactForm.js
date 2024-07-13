import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactUs } from '../../services/apis';
import CountryCode from '../../data/countrycode.json';
import toast from 'react-hot-toast';

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSucessful },
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging data", data);
        try {
            setLoading(true);
            const response = await apiConnector("POST", contactUs.CONTACT_US_API, data);
            console.log("Logging Response >>>", response);
            if(response){
                toast.success("Message sent successfully!")
            }
        } catch (err) {
            console.log(err.message);
            toast.error(err.message)
        }
        setLoading(false); 
        reset();
    }
    useEffect(() => {
        console.log("Submit Successful", isSubmitSucessful);
        if (isSubmitSucessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: ""
            })
        }
    }, [reset,isSubmitSucessful]);


    return (
        <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col justify-center'>
            <div className='flex flex-col lg:flex-row gap-4 '>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor='firstName' className='text-sm'>First Name<sup className='text-pink-400 text-[14px]'>*</sup></label>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        {...register('firstName', { required: true })}
                        className="rounded-md p-2 bg-richblack-600 shadow-richblack-400"
                        placeholder="Enter your first name"></input>
                    {errors.firstName && <p className="text-danger">Please enter your first name</p>}
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor='lastName' className='text-sm'>Last Name<sup className='text-pink-400 text-[14px]'>*</sup></label>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        {...register('lastName', { required: true })}
                        className="rounded-md p-2 bg-richblack-600 shadow-richblack-400"
                        placeholder="Enter your last name"></input>
                    {errors.lastName && <p className="text-danger">Please enter your last name</p>}
                </div>
            </div>
            <div className='flex flex-col gap-y-2 mt-[20px]'>
                <label htmlFor='email' className='text-sm' >Email<sup className='text-pink-400 text-[14px]'>*</sup></label>
                <input
                    type='email'
                    name='email'
                    className='rounded-md p-2 bg-richblack-600 shadow-richblack-400'
                    id='email'
                    placeholder='Enter your Email'
                    {...register('email', { required: true })}></input>
                {errors.email && <p className="text-danger">Please enter your email</p>}
            </div>
            <div className='flex flex-col gap-y-2 mt-[20px]'>
                <label htmlFor='phoneNo' className='text-sm'>Phone Number<sup className='text-pink-400 text-[14px]'>*</sup></label>
                <div className='flex flex-row gap-4 items-center '>
                    {/* drop down */}
                    <div className='text-richblack-800 '>
                        <select
                            name='dropdown'
                            id='dropdown'
                            className=' text-richblack-5 w-[80px] rounded-md p-2 bg-richblack-600 shadow-richblack-400 '
                            {...register('dropdown', { required: true })}
                        >
                            {
                                CountryCode.map((code, index) => {
                                    return <option key={index} value={code.code}
                                    className=''>
                                        {code.code} - {code.country}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className='w-full'>
                    <input
                        type='tel'
                        name='phoneNo'
                        id='phoneNo'
                        {...register('phoneNo', 
                            { required: {value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"}
                            }, )}
                        className="w-full rounded-md p-2 bg-richblack-600 shadow-richblack-400 "
                        placeholder="0123456789"></input>
                    </div>
                </div>
                {errors.phoneNo && <p className="text-pink-300 flex justify-end text-sm">! Invalid Phone Number</p>}
            </div>
            <div className='flex flex-col gap-y-2 mt-[20px]'>
                <label htmlFor='message' className='text-sm'>Message<sup className='text-pink-400 text-[14px]'>*</sup></label>
                <textarea
                    name='message'
                    id='message'
                    {...register('message', { required: true })}
                    className="flex flex-col rounded-md w-full p-2 bg-richblack-600 shadow-richblack-400"
                    rows={4}
                    placeholder="Enter your message"></textarea>
                {errors.message && <p className="text-danger">Please enter your message</p>}
            </div>
            <button type='submit' className='bg-yellow-200 text-black p-2 mt-[30px] rounded-md font-bold'>
                {
                    loading ? (<div>Loading...</div>): (<div>Send Message</div>)
                }
            </button>
        </form>
    )
}

export default ContactForm