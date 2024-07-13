import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { useState } from 'react';
import { GrAddCircle } from "react-icons/gr"
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow } from 'react-icons/bi';
import { setStep, setEditCourse, setCourse } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { updateSection, createSection } from '../../../../../services/operations/courseDetailsApi';
import NestedView from "./NestedView"

const CourseBuilderForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [editSection, setEditSection] = useState(null)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);


    const cancelEdit = () => {
        setEditSection(null);
        setValue("sectionName", "");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext = () => {
        if (course.courseContent.length === 0) {
            toast.error("Please add atleast one Section");
            return;
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please add atleast one Lecture in each Section");
            return;
        }
        dispatch(setStep(3));

    }

    useEffect(()=> {
        console.log("Course", course);
    },[])

    const onSubmit = async (data) => {
        //create and update a section
        setLoading(true);
        // We are editing a section
        let result;
        
        if (editSection) {
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSection,
                    courseId: course._id,
                }, token
            )
            console.log("Result of updatedSection", result);
        } else {
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token)
            if(result){
                // toast.success("Section Updated Successfully");
            }
            console.log('Result of Create Section',result);
        }
        if (result) {
            console.log("Result before setting course", result)
            dispatch(setCourse(result));
            // console.log("Course after setting result", course);
            setEditSection(null);
            setValue("sectionName", "");
        }
        setLoading(false);
    }

    useEffect(() => {
        console.log("Course after setting result", course);
    }, [course]);

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSection === sectionId) {
            cancelEdit();
            return;
        }
        setEditSection(sectionId);
        setValue("sectionName", sectionName);
    }

    return (
        <div className='text-richblack-5'>
            <p className='text-3xl my-[2rem]'>Course Builder</p>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-2 '>
                    <label htmlFor='sectionName' className='text-sm'>Section Name <sup className='text-pink-400'>*</sup></label>
                    <input
                        type="text"
                        id='sectionName'
                        placeholder='Add Section Name'
                        className="form-style w-full text-richblack-5 px-2 rounded-md bg-richblack-600 py-2 border-2 border-b-richblack-300"
                        {...register("sectionName", { required: true })} />
                    {errors.sectionName && <span className='text-red-400'>This field is required</
                    span>}
                </div>
                <div className='flex flex-row items-center '>

                    <IconBtn
                        type="submit"
                        text={`${editSection ? "Edit Section Name" : "Create Section"}`}
                        icon={true}
                        customClasses={"flex items-center gap-2 border border-yellow-200 text-richblack-5 rounded-md px-4 py-2 text-black font-bold"}
                    >
                        <GrAddCircle></GrAddCircle>
                    </IconBtn>
                    {
                        editSection && <IconBtn
                            type="button"
                            text="Cancel edit"
                            icon={false}
                            onClick={() => cancelEdit()}
                            customClasses={"text-richblack-400 ml-[2rem] underline"}></IconBtn>
                    }
                </div>
            </form>
            {
                console.log("Course of Course Builder Form ",course?.courseContent?.length)
            }
            {
                course.courseContent.length > 0 && 
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}></NestedView>
            }
            <div className='flex flex-row gap-3 justify-end mt-4'>
                <button onClick={goBack} className='bg-richblack-600 px-4 py-2 rounded-md'>
                    Back
                </button>
                <IconBtn
                    text="Next"
                    onClick={goToNext}
                    customClasses={"flex flex-row  items-center gap-2 bg-yellow-200 rounded-md px-4 py-1 text-black"}
                >
                    <BiRightArrow></BiRightArrow>
                </IconBtn>
            </div>
        </div>
    )
}

export default CourseBuilderForm