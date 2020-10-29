import * as actionTypes from '../actionTypes.js';
import axios from 'axios';

export const getRestaurantReviews_ = (reviews) => {
    return {
        type: actionTypes.GET_RESTAURANT_REVIEWS,
        target: reviews
    }
}

export const getRestaurantReviews = (id) => {
    return (dispatch) => {
        return axios.get('api/restaurant/:'+ id + '/review')
            .then(res => {
                dispatch(getRestaurantReviews_(res.data));
            })
    }
}


