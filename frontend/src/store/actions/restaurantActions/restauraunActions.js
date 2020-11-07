import * as actionTypes from '../actionTypes';
import axois from 'axios';

export const getRestaurantList_ = (restaurantlist) => {
    return {type:actionTypes.GET_RESTAURANTLIST,restaurantlist};
};

export const getRestaurantList = (name) => {
    return dispatch => {
        return axois.get()
          .then(res => dispatch(getRestaurantList_(res.data)));
    };
};

export const getRestaurantName_ = (searchedlist) => {
    return {type: actionTypes.GET_RESTAURANTNAME,searchedlist};
};
export const getRestaurantName = () => {
    return dispatch => {
        return axois.get()
          .then(res => dispatch(getRestaurantName_(res.data)));
    };
};

export const getRestaurantDetail_ =(selectedrestaurant)=>{
    return {type:actionTypes.GET_RESTAUARANTDETAIL,selectedrestaurant};
};
export const getRestaurantDetail = (restaurantID) =>{
    return dispatch => {
        return dispatch => {
            return axois.get()
              .then(res => dispatch(getRestaurantDetail_(res.data)));
        };
    };
};