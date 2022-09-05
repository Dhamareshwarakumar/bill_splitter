import { combineReducers } from "redux";
import authReducer from './authReducer';
import errReducer from './errReducer';
import groupReducer from "./groupReducer";
import userReducer from "./userReducer";


export default combineReducers({
    auth: authReducer,
    errors: errReducer,
    groups: groupReducer,
    users: userReducer
});