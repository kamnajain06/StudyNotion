import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

const RequirementsField = ({ name, label, register, errors, setValue }) => {

    const {editCourse, course} = useSelector((state) => state.course);
    const [requirement, setRequirement] = useState([]);
    const [requirementsList, setRequirementsList] = useState([]);

    const handleAddReq = (event) => {
        event.preventDefault();
        if (requirement) {
            setRequirementsList([...requirementsList, requirement]);
            setRequirement("");
        }
        console.log("Inside Addd");
    };
    const removeReq = (requirement) => {
        setRequirementsList(requirementsList.filter((req) => req !== requirement));
    }

    useEffect(() => {
        if (editCourse) {
            // console.log("Coursee in ChipInput", course ? course : "Null");
            // const instArray = course?.instructions.split(',').map(inst => inst.trim());
            // console.log("chips in ChipInput", instArray);
            console.log("Instructions",course?.instructions);
            setRequirementsList(course?.instructions)
        }
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, requirementsList);
    }, [requirementsList]);

    return (
        <div className='flex flex-col text-sm gap-2'>
            <label>{label}</label>
            <div className='flex flex-row gap-4 '>
                <input
                    type="text"
                    onChange={(e) => setRequirement(e.target.value)}
                    placeholder='Enter Tags and press Enter'
                    className='w-full text-richblack-5 px-2 rounded-md bg-richblack-600 py-2 border-2 border-b-richblack-300' />
                <button className='bg-yellow-100 text-richblack-700 text-center px-4 rounded-md font-bold items-center border' onClick={(e) => handleAddReq(e)}>Add</button>
            </div>
            <ul className='list-outside'>
                {requirementsList.map((req, index) => (
                    <div className='flex flex-row justify-between'>
                        <li key={index}>
                            {req}
                        </li>
                        <button className=' text-richblack-200 text-center rounded-md  items-center mx-4' onClick={() => removeReq(req)}>Remove</button>
                    </div>
                ))}
            </ul>
            {errors[name] && <p className='text-sm text-pink-400'>{errors[name].message}</p>}

        </div>
    )
}

export default RequirementsField