import * as actionTypes from '../actionTypes.js';
import axios from 'axios';


const getUser_ = user => {
  return {
    type: actionTypes.GET_USER,
    target: user,
  }
}

export const getUser = (id) => {
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

// is it better changing getUser -> new func?
//
const editUserFoodCategory_ = getUser_;

export const editUserFoodCategory = id_and_foodCategory => {
  return dispatch => {
    return axios.put('/api/user/foodCategory', id_and_foodCategory)
      .then(res => {
        dispatch(editUserFoodCategory_(res.data))
      })
  }
}

export const changeLocation_ = (searchLocation) => {
  return { type: actionTypes.CHANGE_LOCATION, searchLocation: searchLocation};
}

export const changeLocation = (searchLocation) => {
  // no db managements yet
  return dispatch => {
    dispatch(changeLocation_(searchLocation));
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
        return axios.put('api/user/preference/' + user.id, user)
            .then(res => {
                dispatch(changePreferenceVector_(user));
            })
    }
}

