
import { combineReducers } from "redux";
import {userReducer} from './userReducer';
import { matchReducer } from "./matchReducer";
import {profileReducer} from "./profileReducer";


const rootReducer = combineReducers({
    user : userReducer,
    match:matchReducer,
    profile:profileReducer,
})


export default rootReducer;