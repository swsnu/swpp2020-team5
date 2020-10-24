import * as actionTypes from '../actionTypes.js';
import axios from 'axios';

export const getUser_ = (user) => {
    return {
        type: actionTypes.GET_USER,
        target: user
    }
}

export const getUser = (id) => {
    return (dispatch) => {
        return axios.get('api/users'/ + id)
            .then(res => {
                dispatch(getUser_(res.data));
            })
    }
}

export const changePreferenceVector_ = (user) => {
    return {
        type: actionTypes.CHANGE_PREFERENCE_VECTOR,
        target: user,
    }
}

export const changePreferenceVector = (user) => {
    return (dispatch) => {
        return axios.put('api/users'/ + user.id, user)
            .then(res => {
                dispatch(changePreferenceVector_(user));
            })
    }
}

