import React from 'react'
import './style.scss';

const Modal = ({text}:{text:string}) => {
  return (
    <div className='timesup-wrapper'>
        <div className='timesup'>{text}</div>
    </div>
  )
}

export default Modal