import * as actionTypes from '../actionTypes'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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

export const postSignIn = (email, password) => {
  return dispatch => {
    // backend sign-in would return the signed in django User and http status 
    return axios.post('/api/sign-in', { email: email, password: password })
    .then (res => dispatch(getUser_(res.data)))
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
const editUserFoodCategory_ = foodCategory =>{
  return {
    type: actionTypes.PUT_FOODCATEGORY,
    target: foodCategory,
  }
};

export const editUserFoodCategory = foodCategory => {
  return dispatch => {
    return axios.put('/api/user/foodCategory', foodCategory)
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

export const postSignUp = (userInfo) => {
  return (dispatch) => {
    return axios.post('api/sign-up/', userInfo)
      .then(res => {})
      .catch(err => {
        console.log('Error in postSignUp');      
      })
  }
}

export const getFoodCategory_ = (foodCategory) => {
  return {
    type: actionTypes.GET_FOODCATEGORY,
    target: foodCategory };
};

export const getFoodCategory = () => {
  return (dispatch) => {
    return axios.get()
      .then(res => {
        dispatch(getFoodCategory_(res.data))
      })
  }
}