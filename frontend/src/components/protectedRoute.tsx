import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/context'

const ProtectedRoute = () => {
    const {isLoggedIn} = useAuthContext();
    const location = useLocation();

    if(!isLoggedIn){
      return <Navigate to="/login" replace state={{from:location}} />
    }

    return <Outlet/>
}

export default ProtectedRoute