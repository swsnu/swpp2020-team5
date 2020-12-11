import axios from 'axios';
import * as actionTypes from '../actionTypes';

// Handling CSRF-Token
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const getMyReviews_ = (reviews) => ({
  type: actionTypes.GET_MY_REVIEWS,
  target: reviews,
});

export const getMyReviews = (restaurantID) => (dispatch) => axios
  .get(`/atm/restaurant/detail/${restaurantID}/my-review/`)
  .then(res => 
    dispatch(getMyReviews_(res.data))
  )
  .catch(err => 
    alert('getMyReviews Error'+err.response.status)
  )
const getOtherReviews_ = (reviews) => ({
  type: actionTypes.GET_OTHER_REVIEWS,
  target: reviews,
});

export const getOtherReviews = (id) => (dispatch) => axios
  .get(`/atm/restaurant/detail/${id}/other-review/`)
  .then(res => 
    dispatch(getOtherReviews_(res.data))
  )
  .catch(err => 
    alert('getOtherReviews Error'+err.response.status)
  )

const postMyReview_ = (reviewInfo) => ({
  type: actionTypes.POST_MY_REVIEW,
  ...reviewInfo,
});

export const postMyReview = (reviewInfo) => (dispatch) => axios.post(`/atm/restaurant/detail/${reviewInfo.restaurantID}/my-review/`, reviewInfo)
  .then((res) => {
    dispatch(postMyReview_(res.data));
  });

const editMyReview_ = (reviewInfo) => ({
  type: actionTypes.EDIT_MY_REVIEW,
  ...reviewInfo,
});

export const editMyReview = (reviewInfo) => (dispatch) => axios.put(`/atm/my-review/${reviewInfo.id}/`, reviewInfo)
  .then((res) => {
    dispatch(editMyReview_(res.data));
  });

const deleteMyReview_ = (reviewID) => ({
  type: actionTypes.DELETE_MY_REVIEW,
  target: reviewID,
});

export const deleteMyReview = (reviewID) => (dispatch) => axios.delete(`/atm/my-review/${reviewID}/`)
  .then((res) => {
    dispatch(deleteMyReview_(res.data.id));
  })
  .catch((res) => {
    console.log('error in deleteMyReview')
  });
