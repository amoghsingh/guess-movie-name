import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { StateType } from '../types/stateTypes';

const ThemeWrapper = ({children}:{children:React.ReactNode}) => {
    const theme = useSelector((state:StateType)=> state?.app?.darkMode);

    useEffect(()=>{
        document.body.classList.toggle("dark", theme);
    },[theme])

  return (<>
    {children}</>
  )
}

export default ThemeWrapper