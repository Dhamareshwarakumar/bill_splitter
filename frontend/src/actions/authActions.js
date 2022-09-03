import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { CLEAR_ERRORS, SET_CURRENT_USER, SET_ERRORS } from "./types";

import setAuthToken from "../config/setAuthToken";


export const userLogin = (formData, navigate) => dispatch => {
    axios.post('/api/users/login', formData)
        .then(res => {
            // Clear The Errors
            dispatch({
                type: CLEAR_ERRORS
            });

            // Get the Token
            const { token } = res.data;
            // Save the token to Local Storage
            localStorage.setItem('jwtToken', token);
            // Set Token to Auth Header
            setAuthToken(token);
            // Decode Token to get User Data
            const decoded = jwt_decode(token);
            // Set Current User
            dispatch(setCurrentUser(decoded));
            // Navigate to Admin Dashboard
            navigate('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const setCurrentUser = decoded => ({
    type: SET_CURRENT_USER,
    payload: decoded
});


// Logout user
export const logout = navigate => dispatch => {
    dispatch(setCurrentUser({}));
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    navigate('/');
}