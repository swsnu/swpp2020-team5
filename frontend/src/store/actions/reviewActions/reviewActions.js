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


