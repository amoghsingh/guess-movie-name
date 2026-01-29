import { types } from "../../actionTypes";
import { Api } from "../../../services/Api";
import { Dispatch } from "redux";

export const updateTheme = (status:boolean) => {
   return {type:types.CHANGE_THEME, payload:status}
}

export const fetchQuestions = () => {
   return(dispatch:Dispatch) => {
      Api.get('/quiz').then((res)=> dispatch({type:types.FETCH_QUIZ, payload:res.data})).catch((error)=>{console.log("fetch quiz error: ",error)})
   }
}

export const updateScore = (score:number) => {
   return {type:types.UPDATE_SCORE, payload:score}
}