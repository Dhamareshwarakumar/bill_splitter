import axios from 'axios';

import { ADD_GROUPS } from './types';


export const getGroups = () => dispatch => {
    axios.get('/api/groups')
        .then(res => {
            dispatch({
                type: ADD_GROUPS,
                payload: res.data
            })
        })
        .catch(err => {
            console.error(err.response.data.msg)
        });
}


export const addGroup = (group, callback) => dispatch => {
    axios.post('/api/groups', group)
        .then(res => {
            dispatch(getGroups())
            callback();
        })
        .catch(err => {
            console.error(err.response.data.msg)
        })
}