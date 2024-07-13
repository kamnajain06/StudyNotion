import React, { useEffect, useState } from 'react'
import { createSubSection } from '../../../../../services/operations/courseDetailsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import IconBtn from '../../../../common/IconBtn';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Upload from '../Upload';
import { updateSubSection } from '../../../../../services/operations/courseDetailsApi';
import 'video-react/dist/video-react.css';

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm();

    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    const dispatch = useDispatch();

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDescription", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, [setValue, view, edit, modalData]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDescription !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl) {
            return true;
        }
        return false;
    }
    const handleEditSubSection = async () => {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("sectionId", modalData.sectionId);
        formData.append("subsectionId", modalData._id);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }else{
            formData.append("title", modalData.title);
        }
        if (currentValues.lectureDescription !== modalData.description) {
            formData.append("description", currentValues.lectureDescription);
        }else{
            formData.append("description", modalData.description);
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("videoUrl", currentValues.lectureVideo);
        }
        // console.log(modalData.videoUrl)

        setLoading(true);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const result = await updateSubSection(formData, token);
        if (result) {
            // console.log("Result", result);

            // course.courseContent.map((section)=> 
            // console.log("section Id", section.id))
            const updatedCourseContent = course.courseContent.map((section) => 
                section._id === modalData.sectionId ? result: section)
            // console.log("UpdatedCourseContent", updatedCourseContent);
            const updatedCourse = {...course, courseContent: updatedCourseContent};
            // console.log("Updated Course", updatedCourse);
            dispatch(setCourse(updatedCourse));
        }
        // console.log("Updated Course aftre updating subsection", course);
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async (data) => {

        // console.log("data", data)
        if (view) return;
        if (edit) {
            if (!isFormUpdated) {
                toast.error("No changes made to the form")
            } else {
                handleEditSubSection();
            }
            return;
        }
        // console.log(3)
        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDescription);
        formData.append("videoUrl", data.videoUrl);

        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }
        setLoading(true);

        try {
            const result = await createSubSection(formData, token);
            if (result) {
                const updatedCourseContent = await course.courseContent.map((section) =>
                    section._id === modalData ? result : section
                )
                const updatedCourse = { ...course, courseContent: updatedCourseContent };
                // console.log(updatedCourse);
                dispatch(setCourse(updatedCourse));
                // console.log(1);
                // console.log(course);
                setModalData(null);
            }
        }catch(err){
            console.log(err)
        }
        setLoading(false);
    }
    return (
        <div className='text-richblack-5 backdrop-blur fixed z-1000 w-screen h-screen inset-0 bg-opacity-10 overflow-auto place-items-center bg-white py-20 grid'>
            <div className='bg-richblack-700 w-11/12 max-w-[600px]'>
                <div className='flex flex-row justify-between bg-richblack-800 px-4 py-2 text-lg'>
                    <p className=''>{view && "Viewing"}{edit && "Editing"} {add && "Adding"} Lecture</p>
                    <button
                        onClick={
                            () => (!loading ? setModalData(null) : "")}
                    >
                        <RxCross1></RxCross1>
                    </button>
                </div>
                <form className='mt-5 px-6 py-3' onSubmit={handleSubmit(onSubmit)}>
                    <Upload
                        name={"videoUrl"}
                        label={"Lecture Video"}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    ></Upload>
                    <div className='flex flex-col gap-2 mt-4'>
                        <label className='text-sm '>Lecture Title <span className='text-pink-400'>*</span></label>
                        <input
                            type="text"
                            className='form-style w-full mt-2 text-richblack-50 px-2 rounded-md bg-richblack-600 py-2 border-2 border-b-richblack-300'
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", {
                                required: "Lecture Title is required",
                                minLength: {
                                    value: 3,
                                    message: "Lecture Title must be at least 3 characters long",
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Lecture Title must be at most 50 characters long",
                                },
                            })}
                        />
                        {errors.lectureTitle && (<p className='text-red-500'>{errors.lectureTitle.message}</p>)}
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <label className='text-sm'>Lecture Description<span className='text-pink-400'>*</span></label>
                        <textarea
                            className='form-style w-full mt-2 text-richblack-50 px-2 rounded-md bg-richblack-600 py-2 border-2 border-b-richblack-300'
                            placeholder='Enter Lecture Description'
                            {...register("lectureDescription", {
                                required: "Lecture Description is required",
                                minLength: {
                                    value: 3,
                                    message: "Lecture Description must be at least 3 characters long",
                                },
                                maxLength: {
                                    value: 500,
                                    message: "Lecture Description must be at most 500 characters long",
                                },
                            })}
                        />
                        {errors.lectureDescription && (<p className='text-red-500'>{errors.lectureDescription
                            .message}</p>)}
                    </div>

                    {
                        !view && <div className='flex justify-end mt-4'>
                            <IconBtn
                                disabled={loading}
                                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                                customClasses={"flex flex-row gap-2 items-center bg-yellow-300 rounded-md px-4 py-2 text-richblack-800 font-bold "}
                            ></IconBtn>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default SubSectionModal