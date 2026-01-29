import { useEffect } from "react";
import TitleImage from "../../components/titleImage";
import startImg from "../../images/start.png";
import './style.scss';
import { useDispatch } from "react-redux";
import { fetchQuestions } from "../../redux/actions/theme";
import { AppDispatch } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";

const Home = () => {
      const dispatch = useDispatch<AppDispatch>();
      const navigate = useNavigate();

  useEffect(()=>{
      dispatch(fetchQuestions());
  })

  const startQuiz = () => {
      navigate("/quiz");
  }

  return (<>
   <TitleImage width="500"/>
    <div className="instructions">
      <h2>Instructions</h2>
      <ul>
        <li>You will be presented with total of 5 questions.</li>
        <li>Each question will present before you a dialogue from a Bollywood movie. You have to guess the movie name based on the dialogue and answer the movie name in the spaces provided.</li>
        <li>As a basic hint, you can guess the movie name by counting the number of words and letters in each words.</li>
        <li>Each question if answered correctly earns you 5 points and guessing a wrong answer will cost you 3 points.</li>
        <li>Once you are ready to answer, click on 'GUESS' button.</li>
        <li>Each question provides you with 3 hints to answer the question. Click to view the hint.</li>
        <li>Remember.. viewing first hint is free. Second hint cost you 1 point and third hint 2 points.</li>
        <li>You will get exactly one minute to answer each question.</li>
        <li>Once the minute is passed, the question will freeze and you will be directed to the next question.</li>
        <li>You cannot visit any questions manually.</li>
      </ul>
      <h3>ALL THE BEST!</h3>
      <div className="start-btn" onClick={startQuiz}><img src={startImg} alt="start-img" className="start-img"/></div>
    </div>
    </>
  )
}

export default Home;