import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "../../types/stateTypes";
import "./style.scss";
import TitleImage from "../../components/titleImage";
import Success from "../../images/Success.json";
import WrongAnswer from "../../images/no-emoji.json";
import Lottie from "lottie-react";
import Timer from "../../components/timer";
import Modal from "../../components/modal";
import { updateScore } from "../../redux/actions/theme";

const Quiz = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState<number>(0);
  const navigate = useNavigate();
  const questions = useSelector((state: StateType) => state?.app?.quiz);
  const score = useSelector((state: StateType) => state?.app?.score);
  console.log("scrore on quiz page : ", score);
  const [hints, setHints] = useState<string[] | []>(
    questions[index]?.hints ? questions[index].hints : [],
  );
  // const [movieName, setMovieName] = useState<string[]>(questions[index]?.answer? questions[index]?.answer.split(""):[]);
  let movieName = questions[index]?.answer.split("");
  const [name, setName] = useState<[] | string[]>(
    movieName.map((x) => (x === " " ? " " : "")),
  );
  const [revealedHints, setRevealedHints] = useState([false, false, false]);
  const [showPoster, setShowPoster] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [msg, setMsg] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [useFreeHint, setUseFreeHint] = useState(false);

/**
 * function : useEffect
 * purpose: remove error message if any after 5 seconds from the UI.
 **/
  useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 5000);
  }, [msg]);


  /**
 * function : useEffect
 * purpose: to reset the quiz question values on new question load.
 **/
  useEffect(() => {
    setShowPoster(false);
    inputRefs.current = [];
    setHints(questions[index]?.hints || []);
    const movieName = questions[index]?.answer.split("") || [];
    setName(movieName.map((x) => (x === " " ? " " : "")));
    setIsCorrect(null);
    setUseFreeHint(false);
    setRevealedHints([false, false, false]);
  }, [index, questions]);


  /**
 * function : revealHint
 * purpose: Total 3 hidden hint. On click of each hint reveals its hint text. Also updates score with each disclosing of each hint.
 **/
  const revealHint = (val: number) => {
    let arr = [...revealedHints];
    if (!arr[val]) {
      arr[val] = true;
      if(useFreeHint === false){
        setUseFreeHint(true);
      }
      else{
         dispatch(updateScore(score-1)); 
      }
      setRevealedHints(arr);
    } else return;
  };

  /**
 * function : calcScore
 * purpose: calculates score for each question depending on correct/wrong answer.
 **/
  const calcSCore = (val: boolean) => {
    if (val) {
      setIsCorrect(true);
        dispatch(updateScore(score+5));
    } else {
      setIsCorrect(false);
      dispatch(updateScore(score-5));
    }
  };


/**
 * function : showAnswer
 * purpose: shows answer in the form of poster image after clciking guess button or after the time is up.
 **/
  const showAnswer = () => {
    console.log(
      "name : ",
      questions[index].answer.toLowerCase().replace(/\s+/g, ""),
    );
    let answer = questions[index].answer.toLowerCase().replace(/\s+/g, "");
    let word = "";
    for (let i = 0; i < inputRefs.current.length; i++) {
      if (inputRefs.current[i]) {
        word += inputRefs.current[i].value;
      }
    }
    console.log(word);

    if (word.length !== answer.length) {
      setMsg("Please fill all the spaces with correct letters.");
      return;
    }

    word === answer ? calcSCore(true) : calcSCore(false);
    setShowPoster(true);

    setTimeout(() => {
      if (index !== questions.length - 1) {
        setIndex((prev) => prev + 1);
      } else {
        navigate("/result");
      }
    }, 4000);
  };

  /**
 * function : handleChange
 * purpose: Adds a character to a given input field plus puts the focus on the next input field if present.
 **/
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    indexVal: number,
  ) => {
    let val = e.target.value;

    let arr = [...name];
    arr[indexVal] = val;
    setName(arr);

    let newIndex = indexVal + 1;
    while (name[newIndex] === " ") {
      newIndex++;
    }

    if (inputRefs.current[newIndex]) {
      inputRefs.current[newIndex].focus();
    }
  };


/**
 * function : handleBackspace
 * purpose: Removes the character in a given input field.
 **/
  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key !== "Backspace") return;
    e.preventDefault();

    if (name[index]) {
      let arr = [...name];
      arr[index] = "";
      setName(arr);
      return;
    }

    let newIndex = index - 1;
    while (movieName[newIndex] === " ") {
      newIndex--;
    }

    if (inputRefs.current[newIndex]) {
      inputRefs.current[newIndex].focus();
    }
  };


/**
 * function : freezeQuestion
 * purpose: locks the question and guess button once the timer expires and then moves to the next question after 2 seconds.
 **/
  const freezeQuestion = (val: string) => {
    if (val === "timesup") {
      setIsTimerExpired(true);
      setTimeout(() => {
        setIsTimerExpired(false);
        if (index !== questions.length - 1) {
          setIndex((prev) => prev + 1);
        } else {      
          navigate("/result");
        }
      }, 2000);
      return;
    }
  };

  return (
    <>
      {/* <TitleImage width="500"/> */}
      <Timer
        freezeQuestion={freezeQuestion}
        showPoster={showPoster}
        index={index}
      />
      <div className="quiz-wrapper">
        {/* <div className='quiz'> */}
        <p className="question">"{questions[index].question}"</p>
        {!showPoster ? (
          <div className="hints">
            {hints?.map((item: string, index: number) => (
              <p
                key={index + 1}
                onClick={() => {
                  revealHint(index);
                }}
              >
                {revealedHints[index] ? item : "Hint " + (index + 1)}
              </p>
            ))}
          </div>
        ) : (
          <div className="poster">
            <img src={questions[index].poster} alt="poster" />
          </div>
        )}
        <div className="answer-input">
          {movieName?.map((x, index) => {
            if (x === " ") {
              return <div key={index} className="space" />;
            }
            // the line ref= is saying 'el' is the input field in the dom. store this input field at the specified index inside the inputRefs array.
            return (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="letter-input"
                value={name[index]}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el;
                  }
                }}
                onChange={(e) => {
                  handleChange(e, index);
                }}
                onKeyDown={(e) => {
                  handleBackspace(e, index);
                }}
              />
            );
          })}
        </div>
        <div className="guess">
          <button onClick={showAnswer} disabled={isTimerExpired}>
            Guess
          </button>
        </div>
        {showPoster ? (
          isCorrect === true ? (
            <Lottie
              animationData={Success}
              style={{
                width: "200px",
                height: "200px",
                position: "absolute",
                top: "50%",
                left: "60%",
                zIndex: "5",
              }}
            />
          ) : (
            <Lottie
              animationData={WrongAnswer}
              style={{
                width: "200px",
                height: "200px",
                position: "absolute",
                top: "45%",
                left: "60%",
                zIndex: "5",
              }}
            />
          )
        ) : null}
        <p className="answer-error">{msg !== "" ? msg : null}</p>
        {/* </div> */}
      </div>
      {isTimerExpired ? <Modal text="Times Up!" /> : null}
    </>
  );
};

export default Quiz;
