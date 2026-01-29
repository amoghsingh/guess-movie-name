import { types } from "../actionTypes"

interface ActionType {
    type:string,
    payload?:any
}

const initialState = {
    darkMode:false,
    quiz:[],
    score:0
}

export const appReducer = (state=initialState, action:ActionType) => {
    switch(action.type){
        case types.CHANGE_THEME: {
            return {...state, darkMode:action.payload }
        }
        case types.FETCH_QUIZ:{
            return {...state, quiz:action.payload}
        }
        case types.UPDATE_SCORE:{
            return {...state, score:action.payload}
        }
        default:return state
    }
}