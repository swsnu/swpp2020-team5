import axios from 'axios';
import * as actionTypes from '../actionTypes';

// Handling CSRF-Token
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const getOtherReviews_ = (reviews) => ({
  type: actionTypes.GET_OTHER_REVIEWS,
  target: reviews,
});

export const getOtherReviews = (id) => (dispatch) => axios.get(`atm/restaurant/:${id}/other-review`)
  .then((res) => {
    dispatch(getOtherReviews_(res.data));
  });

const postMyReview_ = (reviewInfo) => ({
  type: actionTypes.POST_MY_REVIEW,
  ...reviewInfo,
});

export const postMyReview = (reviewInfo) => (dispatch) => axios.post(`atm/restaurant/:${reviewInfo.restaurantID}/review`, reviewInfo)
  .then((res) => {
    dispatch(postMyReview_(res.data));
  });

const editMyReview_ = (reviewInfo) => ({
  type: actionTypes.EDIT_MY_REVIEW,
  ...reviewInfo,
});

export const editMyReview = (reviewInfo) => (dispatch) => axios.put(`atm/my-review/:${reviewInfo.id}`, reviewInfo)
  .then((res) => {
    dispatch(editMyReview_(res.data));
  });

const deleteMyReview_ = (reviewID) => ({
  type: actionTypes.DELETE_MY_REVIEW,
  target: reviewID,
});

export const deleteMyReview = (reviewID) => (dispatch) => axios.put(`atm/my-review/:${reviewID}`)
  .then((res) => {
    dispatch(deleteMyReview_(reviewID));
  })
  .catch((res) => {
    dispatch(deleteMyReview_(reviewID));
  });
