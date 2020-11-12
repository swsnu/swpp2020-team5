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

const postReview_ = (reviewInfo) => ({
  type: actionTypes.POST_REVIEW,
  ...reviewInfo,
});

export const postReview = (reviewInfo) => (dispatch) => axios.post(`api/restaurant/:${reviewInfo.restaurantID}/review`, reviewInfo)
  .then((res) => {
    dispatch(postReview_(res.data));
  })
.catch((res) => {
    dispatch(postReview_(reviewInfo));
})

const putReview_ = (reviewInfo) => ({
  type: actionTypes.PUT_REVIEW,
  ...reviewInfo,
});

export const putReview = (reviewInfo) => (dispatch) => axios.put(`api/review/:${reviewInfo.id}`, reviewInfo)
  .then((res) => {
    dispatch(putReview_(res.data));
  });

const deleteReview_ = (reviewID) => ({
  type: actionTypes.DELETE_REVIEW,
  target: reviewID,
});

export const deleteReview = (reviewID) => (dispatch) => axios.put(`api/review/:${reviewID}`)
  .then((res) => {
    dispatch(deleteReview_(reviewID));
  })
.catch((res) => {
    dispatch(deleteReview_(reviewID));
})
