import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import SideBar from '../Components/Core/Dashboard/SideBar';

const Dashboard = () => {
    const { "loading": profileLoading } = useSelector((state)=> state.auth);
    const { "loading": authLoading } = useSelector((state)=> state.auth);
    if(profileLoading || authLoading){
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }
  return (
    <div className='relative flex flex-row'>
        <div className='w-[15%]'>
        <SideBar></SideBar>
        </div>
        <div className='w-[85%]'>
            <Outlet></Outlet>
        </div>
    </div>
  )
}

export default Dashboard