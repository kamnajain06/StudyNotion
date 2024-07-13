import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { buyCourse } from '../../../../services/operations/buyCourseApi';

const RenderTotalAmount = () => {

    const { total, cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        buyCourse(token, courses, user, navigate, dispatch);
    }

    return (
        <div className='bg-richblack-700 px-6 py-6 rounded-md flex flex-col gap-3 min-w-[220px]'>
            <p className='text-sm text-richblack-200'>Total:</p>
            <p className='text-3xl text-yellow-50'>Rs. {parseInt(total,10)}<span className='text-sm'>.00</span></p>
            <IconBtn
                text={"Buy Now"}
                onClick={() => handleBuyCourse()}
                customClasses={"w-full justify-center bg-yellow-50 text-black font-bold rounded-md px-4 py-2"}>
            </IconBtn>
        </div>
    )
}

export default RenderTotalAmount