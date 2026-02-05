import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/context'

const ProtectedRoute = () => {
    const {isLoggedIn} = useAuthContext();
    const location = useLocation();

    if(!isLoggedIn){
      // what state={{ from:location }} does is.. if not logged in it will redirect to login but once logged in it will redirect back to the page user was trying to access. Replace will prevent you from going back to the page using browser back button before logging in.
      return <Navigate to="/login" replace state={{from:location}} />
    }

    return <Outlet/>
}

export default ProtectedRoute