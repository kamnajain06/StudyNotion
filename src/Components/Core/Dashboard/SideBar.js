import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { SideBarLink } from './SideBarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import { useState } from 'react'
import { logout } from '../../../services/operations/authApi'
import ConfirmationModal from '../../common/ConfirmationModal'

const SideBar = () => {

    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState("");

    if (profileLoading || authLoading) {
        return <div>Loading...</div>
    }
    let cnt = 1;
    return (
        <div className='h-full fixed pt-[6rem] bg-[#0289a1] border-r border-richblue-400 text-richblue-800 text-sm font-bold'>
            <div className='flex flex-col  border-richblack-700 '>
                <div className='flex flex-col gap-1 border-richblue-400 pb-[2rem]'>
                    {sidebarLinks.map((link, index) => {
                        if (link.type && user?.accountType !== link.type) return null;
                        return (
                            <div className='' key={index}>
                                <SideBarLink key={link.id} link={link} iconName={link.icon} ></SideBarLink>
                            </div>
                        )
                    })}
                </div>
                <div className='w-10/12 border-b flex mx-auto bg-richblue-800'></div>
                <div className='flex flex-col gap-4 mt-10 text-richblue-800'>
                    <SideBarLink link={{ name: "Settings", path: "dashboard/settings" }} iconName="VscSettingsGear" ></SideBarLink>
                    <button
                        onClick={() => setConfirmationModal({
                            text1: "Are you sure?",
                            text2: "You will be logged out of your account",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null)
                        })}
                        className='text-sm text-richblue-800 '>
                        <div className='flex items-center gap-2 px-6 '>
                            <VscSignOut className='text-lg'></VscSignOut>
                            <span>Log Out</span>
                        </div>
                    </button>
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>}
        </div>
    )
}

export default SideBar