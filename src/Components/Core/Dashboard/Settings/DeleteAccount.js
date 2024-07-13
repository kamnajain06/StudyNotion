import React, { useState } from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { deleteProfile } from '../../../../services/operations/profileAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from "../../../common/ConfirmationModal"
import { logout } from '../../../../services/operations/authApi';

const DeleteAccount = () => {

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState("");

  return (
    <div className='flex flex-row gap-3 items-start'>
      <div className='bg-pink-600 p-2 rounded-full'>
        <RiDeleteBin5Fill className='text-4xl text-pink-300  ' />
      </div>
      <div>
        <div className='text-xl'>Delete Account</div>
        <div className='font-normal mt-2'>
          <p>Would you like to delete account?</p>
          <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
        </div>
        <button
          onClick={() => setConfirmationModal({
            text1: "Are you sure?",
            text2: "",
            btn1Text: "Delete",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(deleteProfile(token, navigate)),
            btn2Handler: () => setConfirmationModal(null)
          })}
          className='text-md text-richblue-25 mt-[15px] '>
          <div className='flex items-center py-1 px-6 bg-pink-300 bg-opacity-85 italic border-2 border-pink-100'>
            <span>I want to delete my account</span>
          </div>
        </button>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>}
    </div>
  )
}

export default DeleteAccount