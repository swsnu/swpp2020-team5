import axios from 'axios';
import * as actionTypes from '../actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const getUser_ = (user) => ({
  type: actionTypes.GET_USER,
  target: user,
});

export const getUser = (id) => (dispatch) => axios.get(`/api/user/${id}`)
  .then((res) => dispatch(getUser_(res.data)));

export const postSignIn = (email, password) => (dispatch) =>
// backend sign-in would return the signed in django User and http status
  axios.post('/api/sign-in', { email, password })
    .then((res) => dispatch(getUser_(res.data)));

// This includes foodCategory, searchLocation, preferenceVector
const editUser_ = getUser_;

export const editUser = (user) => (dispatch) => axios.put(`/api/user/${user.id}`, user)
  .then((res) => {
    dispatch(editUser_(res.data));
  });

// is it better changing getUser -> new func?
//
const editUserFoodCategory_ = (foodCategory) => ({
  type: actionTypes.PUT_FOODCATEGORY,
  target: foodCategory,
});

export const editUserFoodCategory = (foodCategory) => (dispatch) => axios.put('/api/user/foodCategory', foodCategory)
  .then((res) => {
    dispatch(editUserFoodCategory_(res.data));
  });

export const changeLocation_ = (searchLocation) => ({ type: actionTypes.CHANGE_LOCATION, searchLocation });

export const changeLocation = (searchLocation) =>
  // no db managements yet
  (dispatch) => {
    dispatch(changeLocation_(searchLocation));
  };

export const changePreferenceVector_ = (user) => ({
  type: actionTypes.CHANGE_PREFERENCE_VECTOR,
  target: user,
});

export const changePreferenceVector = (user) => (dispatch) => axios.put(`api/user/preference/${user.id}`, user)
  .then((res) => {
    dispatch(changePreferenceVector_(user));
  });

export const postSignUp = (userInfo) => (dispatch) => axios.post('api/sign-up/', userInfo)
  .then((res) => {})
  .catch((err) => {
    console.log('Error in postSignUp');
  });

export const getFoodCategory_ = (foodCategory) => ({
  type: actionTypes.GET_FOODCATEGORY,
  target: foodCategory,
});

export const getFoodCategory = () => (dispatch) => axios.get()
  .then((res) => {
    dispatch(getFoodCategory_(res.data));
  });
