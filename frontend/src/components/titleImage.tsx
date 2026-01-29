import React from 'react'
import titleImg from '../images/title.png';


const TitleImage = ({width}:{width:string}) => {
    return (<><img src={titleImg} alt="title-image" style={{margin:"0 auto", width:`${width}px` }}/></>
  )
}

export default TitleImage