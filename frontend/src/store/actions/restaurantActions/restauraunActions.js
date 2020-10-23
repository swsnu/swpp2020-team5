import * as actionTypes from '../actionTypes';
import axois from 'axios';

export const getRestaurantList_ = (restaurantlist) => {
    return {type:actionTypes.GET_RESTAURANTLIST,restaurantlist};
};

export const getRestaurantList = () => {
    return dispatch => {
        return axois.get()
          .then(res => dispatch(getRestaurantList_(res.data)));
    };
};