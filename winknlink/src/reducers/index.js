
import { combineReducers } from "redux";
import {userReducer} from './userReducer';
import { matchReducer } from "./matchReducer";


const rootReducer = combineReducers({
    user : userReducer,
    match:matchReducer,
})


export default rootReducer;