import axios from 'axios';
import { push, replace } from 'connected-react-router';
import * as actionTypes from '../actionTypes';

// Handling CSRF-Token
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const getUser_ = (user) => ({
  type: actionTypes.GET_USER,
  target: user,
});

// isExist is boolean
const checkUser_ = (isExist) => ({
  type: actionTypes.CHECK_USER,
  target: isExist,
});

export const checkUser = (username, email) => (dispatch) => axios
  .get(`/atm/user/check/?username=${username}&email=${email}/`)
  .then((res) => dispatch(checkUser_('NotExist')))
  .catch((err) => {
    if (err.response.status === 401) {
      return dispatch(checkUser_('Exist'));
    }
    return alert('checkUser error');
  });

export const resetCheckUser = () => (dispatch) => dispatch({
  type: actionTypes.RESET_CHECK_USER,
});

export const getUser = () => (dispatch) => axios
  .get('/atm/user/me/')
  .then((res) => dispatch(getUser_(res.data)))
  .catch((err) => dispatch(getUser_(null)));

export const postSignIn = (userInfo) => (dispatch) => axios
  .post('/atm/sign-in/', userInfo)
  .then((res) => {
    dispatch({ type: actionTypes.POST_SIGN_IN });
    return dispatch(replace('/'));
  })
  .catch((err) => alert('Login failed'));

export const postSignUp = (userInfo) => (dispatch) => axios
  .post('/atm/sign-up/', userInfo)
  .then((res) => {})
  .catch((err) => {
    if (err.response.status === 409) {
      alert('이미 등록된 회원입니다!');
    } else {
      alert('SignUp Failed');
    }
  });

export const getSignOut = () => (dispatch) => axios
  .get('/atm/sign-out/')
  .then((res) => {
    dispatch({ type: actionTypes.GET_SIGN_OUT });
    return dispatch(replace('/'));
  })
  .catch((err) => {
    alert('sign-out failed!');
  });

const editFoodCategory_ = (foodCategory) => ({
  type: actionTypes.EDIT_FOOD_CATEGORY,
  target: foodCategory,
});

export const editFoodCategory = (foodCategory) => (dispatch) => axios
  .put('/atm/user/food-category/', foodCategory)
  .then((res) => { dispatch(editFoodCategory_(res.data)); })
  .catch((err) => {
    alert('Not logined');
  });

const editSearchLocation_ = (searchLocation) => ({
  type: actionTypes.EDIT_SEARCH_LOCATION,
  target: searchLocation,
});

export const editSearchLocation = (searchLocation) => (dispatch) => axios
  .put('/atm/user/search-location/', searchLocation)
  .then((res) => {
    dispatch(editSearchLocation_(res.data));
  })
  .catch((err) => {
    alert('Not Logined');
  });

const editPreferenceVector_ = (preferenceVector) => ({
  type: actionTypes.EDIT_PREFERENCE_VECTOR,
  target: preferenceVector,
});

export const editPreferenceVector = (preferenceVector) => (dispatch) => axios
  .put('/atm/user/preference-vector/', preferenceVector)
  .then((res) => {
    dispatch(editPreferenceVector_(res.data));
  })
  .catch((err) => {
    alert('Not Logined');
  });

const getFoodCategory_ = (foodCategory) => ({
  type: actionTypes.GET_FOOD_CATEGORY,
  target: foodCategory,
});

export const getFoodCategory = () => (dispatch) => axios
  .get('/atm/user/food-category/')
  .then((res) => {
    dispatch(getFoodCategory_(res.data));
  })
  .catch((err) => {
    alert('Not Logined');
  });

const getSearchLocation_ = (searchLocation) => ({
  type: actionTypes.GET_SEARCH_LOCATION,
  target: searchLocation,
});

export const getSearchLocation = () => (dispatch) => axios
  .get('/atm/user/search-location/')
  .then((res) => {
    dispatch(getSearchLocation_(res.data));
  })
  .catch((err) => {
    alert('Not Logined');
  });

const getPreferenceVector_ = (preferenceVector) => ({
  type: actionTypes.GET_PREFERENCE_VECTOR,
  target: preferenceVector,
});

export const getPreferenceVector = () => (dispatch) => axios
  .get('/atm/user/preference-vector/')
  .then((res) => dispatch(getPreferenceVector_(res.data)))
  .catch((err) => {
    alert(`${err}Not Logined`);
  });

const getCurrentTab_ = (tabMode) => ({
  type: actionTypes.GET_CURRENT_TAB,
  target: tabMode,
});

export const getCurrentTab = () => (dispatch) => axios
  .get('/atm/user/current-tab/')
  .then((res) => dispatch(getCurrentTab_(res.data.tabMode)))
  .catch((err) => {
    alert(`${err}Not Logined`);
  });

const editCurrentTab_ = (tabMode) => ({
  type: actionTypes.EDIT_CURRENT_TAB,
  target: tabMode,
});

export const editCurrentTab = (tabMode) => (dispatch) => axios
  .put('/atm/user/current-tab/', { tabMode })
  .then((res) => dispatch(editCurrentTab_(res.data.tabMode)))
  .catch((err) => alert('Not Logined'));
