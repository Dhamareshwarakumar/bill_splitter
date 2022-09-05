import axios from 'axios';
import { SET_USERS } from './types';

export const getUsers = () => dispatch => {
    axios.get('api/users')
        .then(res => {
            dispatch({
                type: SET_USERS,
                payload: res.data
            });
        })
        .catch(err => console.error(err.response.data.msg));
}