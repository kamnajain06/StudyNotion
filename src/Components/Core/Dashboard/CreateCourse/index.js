import React from 'react'
import RenderSteps from './RenderSteps'
import { AiFillThunderbolt } from "react-icons/ai";

export default function CreateCourse() {
    return (
        <div className='text-richblue-5 pt-[6rem] px-6 '>
            <h1 className='text-3xl'>Add a Course</h1>
            <div className='flex flex-row gap-10'>
                <div className='w-3/5'>
                    <RenderSteps></RenderSteps>
                </div>
                <div className='flex flex-col bg-richblack-800 h-full w-2/5 px-6 py-4 rounded-lg'>
                    <p className='flex items-center '><span className='text-yellow-200'><AiFillThunderbolt /></span>Code Upload Tips</p>
                    <ul className='text-sm my-2 flex flex-col gap-3' 
                    style={{
                        listStyleType: 'disc',
                        padding: '1rem',
                        }}
                    >
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li> Information from the Additional Data section shows up on the course single page.</li>
                        <li> Make Announcements to notify any important</li>
                        <li>  Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}