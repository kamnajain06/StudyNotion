import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsApi';
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import RequirementsField from './RequirementsField';
import IconBtn from '../../../../common/IconBtn';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { addCourseDetails } from '../../../../../services/operations/courseDetailsApi';
import { apiConnector } from '../../../../../services/apiconnector';
import { categories } from '../../../../../services/apis';
import Upload from '../Upload';
import ChipInput from './ChipInput';
import { setStep,setCourse } from '../../../../../slices/courseSlice';


const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm();

    const dispatch = useDispatch();
    const { course, step, editCourse } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        console.log("Course in course information form", course);
    },[course])

    useEffect(() => {
        
        const getCategories = async () => {
            setLoading(true);
            const response = await apiConnector("GET", categories.CATEGORIES_API);
            setCourseCategories(response.data.allCategory);
            setLoading(false);
        }
        getCategories();
        console.log("Course Categories", courseCategories);
    }, [])

    useEffect(() => {
        if (editCourse && course) {
            setValue("courseTitle", course.title);
            setValue("courseDescription", course.description);
            setValue("courseCategory", course.category);
            setValue("courseLanguage", course.language);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tags);
            setValue("courseBenefits", course.learnings);
            setValue("courseLanguage", course.language);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnailImage);

        }
    },[editCourse,course]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.courseTitle != course.title ||
            currentValues.courseDescription != course.description ||
            currentValues.courseCategory !== course.category||
            currentValues.courseLanguage !== course.language.toString()||
            currentValues.coursePrice != course.price ||
            currentValues.courseTags.toString() != course.tags.toString() ||
            currentValues.courseLearnings != course.learnings ||
            currentValues.courseLanguage != course.language ||
            currentValues.courseRequirements.toString() != course.instructions.toString() ||
            currentValues.courseImage != course.thumbnailImage
        ) {
            return true;
        } else {
            return false;
        }
    }
    //handle next button click
    const onSubmit = async (data) => {
        console.log("Course Information", data);
        if (editCourse) {

            if (isFormUpdated()) {
                const currentValues = getValues()
                const formData = new FormData()
                console.log("Course Id in formData", course);
                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.title) {
                    formData.append("title", data.courseTitle)
                }
                if (currentValues.courseDescription !== course.description) {
                    formData.append("description", data.courseDescription)
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tags.toString()) {
                    formData.append("tags", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseLearnings !== course.learnings) {
                    formData.append("learnings", data.courseLearnings)
                }
                if (currentValues.courseCategory !== course.category) {
                    formData.append("category", data.courseCategory)
                    // console.log("current value courseCategory", data.courseCategory);
                }
                if (currentValues.courseLanguage.toString() !== course.language.toString()) {
                    formData.append("language",JSON.stringify(data.courseTags))
                    // console.log("current value courseCategory", data.courseCategory);
                }
                if (
                    currentValues.courseRequirements.toString() !==
                    course.instructions.toString()
                ) {
                    console.log("Course Requirements", JSON.stringify(data.courseRequirements));
                    formData.append("instructions",JSON.stringify(data.courseRequirements))
                }
                if (currentValues.courseImage !== course.thumbnailImage) {
                    formData.append("thumbnailImage", data.courseImage)
                }
                console.log("data", data);
                setLoading(true)
                const result = await editCourseDetails(formData, token);
                setLoading(false)
                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            } else {
                toast.error("No changes made to the form")
            }
            return
        }

        const formData = new FormData();
        formData.append("title", data.courseTitle);
        formData.append("description", data.courseDescription);
        formData.append("category", data.courseCategory);
        formData.append("language", data.courseLanguage);
        formData.append("price", data.coursePrice);
        formData.append("tags", data.courseTags);
        formData.append("learnings", data.courseLearnings);
        formData.append("instructions",data.courseRequirements);
        // console.log("instructions",data.courseRequirements);
        formData.append("thumbnailImage", data.courseImage);
        formData.append("status", COURSE_STATUS.DRAFT);

        console.log("formData", data);

        setLoading(true);
        try {
            const response = await addCourseDetails(formData, token);
            console.log("Response", response);
            setLoading(false);
            if (response) {
                dispatch(setStep(2));
                dispatch(setCourse(response));
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }

    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='rounded-md border-richblue-700 border p-4 my-[3rem] bg-richblack-800 flex flex-col gap-4 text-richblack-5'>
            <div className='flex flex-col gap-2 text-richblack-5'>
                <label htmlFor='courseTitle'
                    className='text-sm'>Course Title <sup className='text-pink-400'>*</sup></label>
                <input
                    id='courseTitle'
                    placeholder='Enter Course Title'
                    type='text'
                    {...register("courseTitle", { required: true })}
                    className="form-style w-full text-richblack-5 px-2 rounded-md bg-richblack-600 py-2 border-2 border-b-richblack-300">
                </input>
                {errors.courseTitle && <p className='text-sm text-pink-400'>Course title is required</p>}
            </div>

            <div className='flex flex-col gap-2'>
                <label
                    className='text-sm '>Course Description <sup className='text-pink-400'>*</sup></label>
                <textarea
                    id='courseDescription'
                    placeholder='Enter Course Description'
                    type='text'
                    {...register("courseDescription", { required: true })}
                    className=" min-h-[140px] form-style w-full text-richblack-5 px-2 rounded-md bg-richblack-600 py-2 border-2 border-b-richblack-300">
                </textarea>
                {errors.courseDescription && <p className='text-sm text-pink-400'>Course description is required</p>}
            </div>
            <div className='flex flex-col gap-2 relative'>
                <label className='text-sm relative '>Course Price <sup className='text-pink-400'>*</sup>
                    <input
                        id='coursePrice'
                        placeholder='Enter Course Price'
                        type='number'
                        {...register("coursePrice", { required: true, })}
                        className='form-style w-full mt-2 text-richblack-50 px-8 rounded-md bg-richblack-600 py-2 border-2 border-b-richblack-300'>
                    </input>
                    <HiOutlineCurrencyRupee className='absolute bottom-2 left-1 text-2xl text-richblack-50' />
                </label>

                {errors.coursePrice && <p className='text-sm text-pink-400'>Course price is required</p>}
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-sm'>Course Category <sup className='text-pink-400'>*</sup></label>
                <select
                    id='courseCategory'
                    {...register("courseCategory", { required: true })}
                    defaultValue=""
                    className='w-full text-richblack-5 px-2 rounded-md bg-richblack-600 py-2 border-2 border-b-richblack-300'>
                    <option value="" disabled={true}>Select Category</option>
                    {!loading && courseCategories?.map((category) => (
                        <option key={category._id} value={category?._id}>{category?.name}
                        </option>
                    ))}
                </select>
                {errors.courseCategory && <p className='text-sm text-pink-400'>Course category is required</p>}
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-sm'>Language <sup className='text-pink-400'>*</sup></label>
                <select
                    id='courseLanguage'
                    {...register("courseLanguage", { required: true })}
                    defaultValue="English"
                    className='w-full text-richblack-5 px-2 rounded-md bg-richblack-600 py-2 border-2 border-b-richblack-300'>
                    <option value="" disabled={true}>Select Category</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Hinglish">Hinglish</option>
                </select>
                {errors.courseLanguage && <p className='text-sm text-pink-400'>Course Language is required</p>}
            </div>
            {/* Custom component of tags */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}

            />
            {/* Custom component for upload media */}
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />
            {/* Benefits of the Course */}
            <div className='flex flex-col gap-2'>
                <label className='text-sm'>Course Learnings <sup className='text-pink-400'>*</sup></label>
                <input
                    id='courseLearnings'
                    placeholder='Enter Course Learnings'
                    {...register("courseLearnings", { required: true })}
                    className='w-full text-richblack-5 px-2 rounded-md bg-richblack-600 py-2 border-2 border-b-richblack-300'></input>
                {errors.courseLearnings && <p className='text-sm text-pink-400'>Course learnings is required</p>}
            </div>

            <RequirementsField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
            ></RequirementsField>

            <div>
                {
                    editCourse && <button
                        onClick={() => dispatch(setStep(2))}>
                        Continue Without saving
                    </button>
                }
            </div>
            <div >
                <IconBtn
                    type="submit"
                    customClasses={"bg-yellow-200 text-richblack-800 font-bold px-4 py-2 font-bold rounded-md"}
                    text={!editCourse ? "Next" : "Save Changes"}
                >
                </IconBtn>
            </div>

        </form>
    )
}

export default CourseInformationForm