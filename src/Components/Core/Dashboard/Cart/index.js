import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

export default function Cart(){

    const {total,totalItems} = useSelector((state)=> state.cart);

    return(
        <div className='text-richblue-5 pt-[6rem] w-10/12 mx-auto'>
            <h1 className='text-4xl font-bold mb-8'>Your Cart</h1>
            <p className='text-richblack-200 border-b pb-2'>{totalItems} Courses in Cart</p>
            <div className='mt-4'>
                {
                    total > 0 ? (
                    <div className='flex justify-between'>
                        <div className='w-full'>
                            <RenderCartCourses></RenderCartCourses>
                        </div>
                        <div>
                            <RenderTotalAmount></RenderTotalAmount>
                        </div>
                    </div>) : (<div> Your Cart is Empty</div>)
                }
            </div>
        </div>
    )
}
