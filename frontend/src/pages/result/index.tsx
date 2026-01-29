import { useSelector } from 'react-redux';
import { StateType } from '../../types/stateTypes';
import './style.scss';
import Celebration from  "../../images/Celebration.json";
import Lottie from 'lottie-react';
import Confetti from "../../images/Confetti.json";
import DanceStars from "../../images/dance-stars.json";
import Success from "../../images/Success1.json";
import heading from  "../../images/result.png"
import yourscore from  "../../images/score.png"
import congo from "../../images/congo.png"

const Result = () => {
  const score = useSelector((state:StateType)=> state?.app?.score);
  
  return (
    <div className='result-page'>
        <h1><img src={heading} alt="result" /></h1>
        <Lottie animationData={Celebration} style={{position:"absolute", top:"80px", left:"100px"}} />
        <Lottie animationData={Celebration} style={{position:"absolute", top:"80px", right:"100px"}} />
         <Lottie animationData={Confetti} style={{position:"absolute", top:"120px", left:"300px", width:"450px"}} />
        <Lottie animationData={DanceStars} style={{position:"absolute", top:"250px", right:"100px", width:"300px", height:"300px"}} />
        <Lottie animationData={DanceStars} style={{position:"absolute", top:"250px", left:"100px", width:"300px", height:"300px"}} />        
        <Lottie animationData={Success} style={{position:"absolute", top:"350px", right:"100px", width:"300px", height:"300px"}} />
        <Lottie animationData={Success} style={{position:"absolute", top:"350px", left:"100px", width:"300px", height:"300px"}} />

        <div className='scorecard'>
          
            <p><img src={yourscore} alt="yourscore" /></p>
            <p>{score}</p>
        </div>
        <div className='congo'><img src={congo} alt="congo" /></div>
    </div>
  )
}

export default Result