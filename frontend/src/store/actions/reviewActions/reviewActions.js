import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getReviews_ = (reviews) => {
    return {
        type: actionTypes.GET_REVIEWS,
        target: reviews
    }
}

export const getReviews = (id) => {
    return (dispatch) => {
        return axios.get('api/restaurant/:'+ id + '/review')
            .then(res => {
                dispatch(getReviews_(res.data));
            })
    }
}

const putReview_ = (reviewInfo) => {
  return {
    type: actionTypes.PUT_REVIEW,
    target: reviewInfo,
  }
}

export const putReview = (reviewID, reviewInfo) => {
  return (dispatch) => {
    return axios.put(`api/review/:${reviewID}`, reviewInfo)
      .then(res => {
        dispatch(putReview_(res.data));
      })
  }
}

const deleteReview_ = (reviewID) => {
  return {
    type: actionTypes.DELETE_REVIEW,
    target: reviewID,
  }
}

export const deleteReview = (reviewID) => {
  return (dispatch) => {
    return axios.delete(`api/review/:${reviewID}`)
      .then(res => {
        dispatch(deleteReview_(reviewID));
      })
  }
}


