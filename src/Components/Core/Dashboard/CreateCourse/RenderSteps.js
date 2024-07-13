import React from 'react'
import { FaCheck } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishForm from './Publish/PublishForm';

const RenderSteps = () => {

    const { step } = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        }
    ]
    return (
        <div className='mt-[2rem]'>
            <div className='flex flex-row justify-between'>
                {
                    steps.map((item, index) => {
                        return (
                            <>
                                <div key={index} className='flex flex-col gap-2 items-center relative z-1000'>
                                    <div className={`w-8 aspect-square flex items-center justify-center  ${step === item.id ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                                        : "border-richblack-700 text-richblack-400 bg-richblack-800"} border text-center rounded-full`}>
                                        {
                                            step > item.id ? (<FaCheck></FaCheck>) : (item.id)
                                        }
                                    </div>
                                    {item.id !== steps.length && (
                                        <div
                                            className={`h-[calc(34px/2)] w-[250px] absolute translate-x-[155px] border-dashed border-b-4 ${step > item.id ? "border-yellow-50" : "border-richblack-500"
                                                } `}
                                        ></div>
                                    )}
                                    <div className='w-full text-sm text-start'>
                                        {item.title}
                                    </div>
                                </div>
                            </>

                        )

                    }

                    )
                }

            </div>
            {
                step === 1 && <CourseInformationForm ></CourseInformationForm>
            }
            {
                step == 2 && <CourseBuilderForm></CourseBuilderForm>
            }
            {
                step == 3 && <PublishForm></PublishForm>
            }
        </div>
    )
}

export default RenderSteps