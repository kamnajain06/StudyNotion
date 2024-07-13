import React, { Children } from 'react'
import { FaChildren } from 'react-icons/fa6';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {token} = useSelector((state)=> state.auth);
    if(token !== null){
        return children
    }else{
        return <Navigate to='/login'></Navigate>
    }
}

export default PrivateRoute