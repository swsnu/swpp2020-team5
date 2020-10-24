import * as actionTypes from '../actionTypes';
import axios from 'axios';

const getUser_ = user => {
  return {
    type: actionTypes.GET_USER,
    target: user,
  }
}

export getUser = (id) => {
  return dispatch => {
    return axios.get('/api/user/'+id)
      .then(res => dispatch(getUser_(res.data)))
  }
}

const loginUser_ = getUser_;

// Many people log in simultaneously to same account?
//
// login_ID_PW is dict
export const loginUser = login_ID_PW => {
  return dispatch => {
    return axios.put('/api/user', login_ID_PW)
      .then(res => {
        dispatch(loginUser_(res.data))
      })
      .catch(err => {
        if (err.response.status == 401) { // this is for double login

        }
        else if(err.response.status == 404) { // this is for incorrect ID or PW

        }
      })
  }
}

// This includes foodCategory, searchLocation, preferenceVector
const editUser_ = getUser_;

export const editUser = user => {
  return dispatch => {
    return axios.put('/api/user/'+user.id, user)
      .then(res => {
        dispatch(editUser_(res.data))
      })
  }
}

