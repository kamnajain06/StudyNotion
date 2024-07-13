import React from 'react'
import { useNavigate } from 'react-router-dom'
import ReactStars from 'react-stars'

const ReviewCard = ({card}) => {

    const navigate = useNavigate();

  return (
    <div className='text-richblack-5 w-[250px] min-h-[150px] max-h-[350px] px-4 py-2 bg-richblack-800'
    onClick={()=> navigate(`/course/${card?.course?._id}`)}
    >
        <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
                <img src={card?.user?.image} className='aspect-square w-12 h-12 rounded-full'></img>
                <div className='flex flex-col'>
                    <p className='font-bold'>{card?.user?.firstName} {card?.user?.lastName}</p>
                    <p className='text-sm text-richblack-400'>{card?.course?.title}</p>
                </div>
            </div>
            <div className='text-start'>
                <p className=''>{
                    card?.review?.length > 30 ? 
                    card?.review?.slice(0, 30) + '...' :
                    card?.review
                }</p>
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <p className='text-yellow-50 text-xl'>{card?.rating}</p>
                <div>
                    <ReactStars
                        count={5}
                        size={24}
                        value={card?.rating}
                        edit={false}
                        color2={'#ffd700'}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard