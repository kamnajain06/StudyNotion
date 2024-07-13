import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cartSlice, { addItems, removeItems } from '../../../slices/cartSlice';
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { FaRegShareFromSquare } from "react-icons/fa6";
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { IoMdArrowDropright } from "react-icons/io";

function CourseDetailsCard({course, setConfirmationModal, handleBuyCourse}){

    const {
        thumbnail,
        title,
        price,
        description,
        instructions,
        studentsEnrolled,
    } = course;

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { cart } = useSelector((state)=> state.cart);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You can't add course to cart");
            return;
        };
        if(token){
            dispatch(addItems(course));
            navigate('/dashboard/cart');
        };
        setConfirmationModal({
            text1:"You are not logged in",
            text2:"Please login to add course to cart",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => navigate('/login'),
            btn2Handler:() => setConfirmationModal(null),
        });
    }

    const handleShareButton = () => {
        copy(window.location.href);
        toast.success('Link Copied Successfully');
    }

  return (
    <div className='text-richblue-5 max-w-[500px] min-w-[400px] max-h-[700px] min-h-[300px] px-4 py-2 flex flex-col gap-2 '>
        <div className='flex justify-center'>
            <img src={thumbnail} alt="thumbnail" className='max-w-[350px] min-w-[150px] rounded-lg'></img>
        </div>
        <div className='flex justify-between items-center my-4'>
            <p className='text-3xl font-bold'>Rs. {price}/-</p>  
            <p className='text-3xl font-bold'>
                {/* {
                    console.log("CourseId", cart.includes(course._id))
                } */}
                {
                    user && (studentsEnrolled.includes(user._id) || cart.some(item => item._id === course._id))  ? 
                    <button onClick={() => dispatch(removeItems(course._id))}>
                        <FaBookmark />
                    </button> : <button onClick={() => dispatch(addItems(course))}>
                        <FaRegBookmark />
                    </button>
                }
            </p>
        </div>
        <div className='flex flex-col gap-2 w-10/12 mx-auto'>
            <button 
            onClick={()=> user && studentsEnrolled.includes(user._id)? navigate("/dashboard/enrolled-courses") : handleBuyCourse()}
            className='bg-yellow-50 text-richblack-800 font-bold px-4 py-2 text-lg rounded-md '
            >
                {
                    user && studentsEnrolled.includes(user._id) ? "Go to Courses" : "Buy Now"
                }
            </button>
            {
                user && !studentsEnrolled.includes(user._id) && <button
                onClick={()=> handleAddToCart()}
                className='bg-richblue-200 text-white font-bold px-4 py-2 text-lg  rounded-md'
                >
                    Add To Cart
                </button>
            }
        </div>
        <p className='text-sm text-center text-richblue-25'>30-Day Money-Back Guarantee</p>
        <p>
            {
                instructions.length > 0 && <div>
                        <p className='text-xl font-bold my-3'>This Course Includes: </p>
                        {
                            instructions.map((inst)=> {
                                return <p className='flex items-center text-caribbeangreen-100 text-sm'><IoMdArrowDropright />{inst}</p>
                            })
                        }
                </div>
            }
        </p>
        <button className='flex items-center gap-1 text-yellow-50 justify-center'
        onClick={() => handleShareButton()}
        >
            <FaRegShareFromSquare />Share
        </button>

    </div>
  )
}

export default CourseDetailsCard;
