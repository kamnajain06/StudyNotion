import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';

const ChangeDP = () => {
    const {user} = useSelector((state) => state.profile);
  return (
    <div>
        <div className='flex flex-row items-center gap-2'>
            <div className='w-20'><img src={user?.image} className='aspect-square border rounded-full'></img></div>
            <div className='flex flex-col'>
                <p>Change Profile Picture</p>
                <div className='flex flex-row gap-1'>
                    <input
                    type="file"
                    id="file"
                    accept=".jpg, .jpeg, .png"
                    className='hidden'
                    />
                    <IconBtn text={"Upload"} ></IconBtn>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangeDP