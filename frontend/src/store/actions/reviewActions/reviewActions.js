import axios from 'axios';
import * as actionTypes from '../actionTypes';

export const getReviews_ = (reviews) => ({
  type: actionTypes.GET_REVIEWS,
  target: reviews,
});

export const getReviews = (id) => (dispatch) => axios.get(`api/restaurant/:${id}/review`)
  .then((res) => {
    dispatch(getReviews_(res.data));
  });

const putReview_ = (reviewInfo) => ({
  type: actionTypes.PUT_REVIEW,
  target: reviewInfo,
});

export const putReview = (reviewID, reviewInfo) => (dispatch) => axios.put(`api/review/:${reviewID}`, reviewInfo)
  .then((res) => {
    dispatch(putReview_(res.data));
  });

const deleteReview_ = (reviewID) => ({
  type: actionTypes.DELETE_REVIEW,
  target: reviewID,
});

export const deleteReview = (reviewID) => (dispatch) => axios.delete(`api/review/:${reviewID}`)
  .then((res) => {
    dispatch(deleteReview_(reviewID));
  });
