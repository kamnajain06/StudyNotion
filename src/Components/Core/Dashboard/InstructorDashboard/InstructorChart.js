import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables)

const InstructorChart = ({ courses }) => {

    const [currentChart, setCurrentChart] = useState("students");

    const getRandomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)} )`
            colors.push(color);
        }
        return colors;
    }
    // create data for chart displaying student info
    const studentData = {
        labels: courses.map((course) => course?.title),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            },
        ],
    };
    // create data for chart displaying income info
    const incomeData = {
        labels: courses.map((course) => course?.title),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            },
        ],
    }

    // create options
    const options = {

    }
    console.log("Course", courses);
    return (
        <div className=''>
            <p className='text-lg font-bold'>Visualize</p>
            <div className='my-3'>
                <button className={`${currentChart === "students" ? "font-bold bg-richblack-700" : ""} px-2`} onClick={()=> setCurrentChart("students")}>Student</button>
                <button className={`${currentChart === "income" ? "font-bold bg-richblack-700" : ""} px-2`} onClick={()=> setCurrentChart("income")}>Income</button>
            </div>
            <div className=' mx-auto aspect-square h-[400px] flex justify-center w-full'>
                <Pie data={currentChart === "students" ? studentData : incomeData}
                options={options}></Pie>
            </div>
        </div>
    )
}

export default InstructorChart