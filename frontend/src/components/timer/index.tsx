import React,{useEffect, useState} from 'react';
import './style.scss';

const Timer = ({freezeQuestion,showPoster, index}:{freezeQuestion:(val:string)=>void, showPoster:boolean, index:number}) => {
const [seconds, setSeconds] = useState<number>(60);

        useEffect(()=>{
            setSeconds(60);
        },[index]);

        useEffect(()=>{
            if(seconds === 0) { freezeQuestion("timesup"); return;}
            if(showPoster) return;
            let timer = setInterval(()=>{
                setSeconds(prev => prev-1);
            },1000);
            return ()=>{
                clearInterval(timer);
            }
        },[seconds, showPoster]);

    const formatTime = (seconds:number) => {
        // Here we are returnig  the value in the form of minutes:seconds. 
        const minutes = Math.floor(seconds/60); // because dividing any number by 60 gives you the minute value.
        const remainingSeconds = seconds%60;  // becasue mod of any number by 60 gives you value in the range 0 to 59.
        return `${String(minutes).padStart(2,"0")}:${String(remainingSeconds).padStart(2,"0")}`
    }

  return (
    <div className='timer'><span>{formatTime(seconds)}</span></div>
  )
}

export default Timer


// Timer component countdown of 1 minute and also implementation of smothly decreasing time bar along circumference of circle.
// import React, { useEffect, useState } from "react";

// const RADIUS = 90;
// const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// const TOTAL_TIME = 60;

// const Timer = () => {
//   const [seconds, setSeconds] = useState(TOTAL_TIME);

//   useEffect(() => {
//     if (seconds === 0) return;

//     const timer = setInterval(() => {
//       setSeconds(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [seconds]);

//   const progress = seconds / TOTAL_TIME;
//   const dashOffset = CIRCUMFERENCE * (1 - progress);

//   const formatTime = (secs) => {
//     const mins = Math.floor(secs / 60);
//     const secsLeft = secs % 60;
//     return `${String(mins).padStart(2, "0")}:${String(secsLeft).padStart(2, "0")}`;
//   };

//   return (
//     <div className="timer-container">
//       <svg width="220" height="220">
//         {/* Background Circle */}
//         <circle
//           cx="110"
//           cy="110"
//           r={RADIUS}
//           stroke="#e5e5e5"
//           strokeWidth="10"
//           fill="none"
//         />

//         {/* Progress Circle */}
//         <circle
//           cx="110"
//           cy="110"
//           r={RADIUS}
//           stroke="black"
//           strokeWidth="10"
//           fill="none"
//           strokeDasharray={CIRCUMFERENCE}
//           strokeDashoffset={dashOffset}
//           strokeLinecap="round"
//           style={{
//             transition: "stroke-dashoffset 1s linear",
//             transform: "rotate(-90deg)",
//             transformOrigin: "50% 50%",
//           }}
//         />
//       </svg>

//       <div className="time-text">{formatTime(seconds)}</div>
//     </div>
//   );
// };

// export default Timer;




// .timer-container {
//   position: relative;
//   width: 220px;
//   height: 220px;
// }

// .time-text {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   font-size: 24px;
//   font-weight: bold;
// }
