import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

export const SideBarLink = ({ link, iconName }) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    return (
        <div>
            <NavLink
                to={link.path}
                className={`relative bg-richblue-500  ${matchRoute(link.path) ? "bg-yellow-400" : "bg-blue-700"}`}>
                <div className='absolute w-full h-full'>
                <span className={`absolute top-0 h-full w-1 bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>
                </span>
                </div>
                <div className={`flex flex-row items-center gap-2 px-6 py-2  ${matchRoute(link.path) ? "bg-yellow-700 bg-opacity-60" : ""}`}>
                    <Icon className={`text-[17px] ${matchRoute(link.path) ? "text-yellow-100 " : "text-richblue-400"}`}></Icon>
                    <span className={`${matchRoute(link.path) ? "text-yellow-100 " : "text-richblue-800"}`}>{link.name}</span>
                </div>
            </NavLink>
        </div>
    )
}
