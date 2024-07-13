import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BiCross } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import ReactStars from 'react-stars';
import { createRating } from '../../../services/operations/ratingAndReviewApi';
import IconBtn from '../../common/IconBtn';
import { RxCross2 } from "react-icons/rx";

const CourseReviewModal = ({setReviewModal}) => {

    const { user } = useSelector((state)=> state.profile);
    const { courseEntireData } = useSelector((state)=> state.viewCourse); 
    const { token } = useSelector((state) => state.auth);

    const onSubmit = async (data) => {
        const result = await createRating({
            courseId: courseEntireData._id,
            rating: data.courseRating,
            review: data.courseExperience,
        }, token);
        console.log("Result", result);
        setReviewModal(false);
    };

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm();

    useEffect(()=> {
        setValue('courseExperience', "");
        setValue('courseRating', 0);
    });

  return (
    <div className='fixed inset-0 flex justify-center items-center backdrop-blur-lg z-[1000] h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-30'>
        <div className='bg-richblack-900 text-richblack-5 text-lg'>
            <div className='flex items-center justify-between p-2 bg-richblack-700'>
                <p className=''>Add Review</p>
                <button
                onClick={()=> setReviewModal(false)}
                ><RxCross2 /></button>
            </div>
            <div className='mt-[1em] py-4 flex justify-center items-center'>
                <img src={user?.image} className='aspect-square rounded-full w-12'></img>
                <div className='text-sm px-3'>
                    <p className='text-md font-bold'>{user?.firstName} {user?.lastName}</p>
                    <p className=''>Posting Publicly.</p>
                </div>
            </div>
            <div className='px-10 py-4 flex flex-col justify-center '>
                <form
                onSubmit={handleSubmit(onSubmit)}
                className=''
                >
                <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor='#ffd700'
                className=' flex justify-center'
                />
                <div className='flex flex-col gap-1 mt-[2rem]'>
                    <label htmlFor='courseExperience'
                    className='text-sm'
                    >Course Experience</label>
                    <textarea
                        rows={5}
                        cols={50}
                        className='px-2 rounded-md text-richblack-900'
                        id="courseExperience"
                        placeholder='Add your experience here'
                        {...register("courseExperience", {
                            required: true,
                            minLength: 10,
                            maxLength: 500,
                            })}
                    >
                    </textarea>
                </div>
                <div className='flex items-center gap-4 justify-end mt-[2rem]'>
                    <button
                    onClick={()=> setReviewModal(false)}
                    className='bg-richblack-500 rounded-md px-4 py-2 '
                    >Cancel</button>
                    <IconBtn
                        text="Save"
                        type="submit"
                        customClasses={"bg-yellow-50 text-richblack-900 rounded-md px-4 py-2 "}
                    ></IconBtn>
                </div>
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default CourseReviewModal