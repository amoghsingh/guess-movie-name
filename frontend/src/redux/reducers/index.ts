import { appReducer } from "./appReducer";
import { combineReducers } from "redux";

export const reducer = combineReducers({app:appReducer});

