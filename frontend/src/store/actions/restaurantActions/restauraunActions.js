import axois from 'axios';
import * as actionTypes from '../actionTypes';

export const getRestaurantList_ = (restaurantlist) => ({ type: actionTypes.GET_RESTAURANTLIST, restaurantlist });

export const getRestaurantList = (name) => (dispatch) => axois.get()
  .then((res) => dispatch(getRestaurantList_(res.data)));

export const getRestaurantName_ = (searchedlist) => ({ type: actionTypes.GET_RESTAURANTNAME, searchedlist });
export const getRestaurantName = () => (dispatch) => axois.get()
  .then((res) => dispatch(getRestaurantName_(res.data)));

export const getRestaurantDetail_ = (selectedrestaurant) => ({ type: actionTypes.GET_RESTAUARANTDETAIL, selectedrestaurant });
export const getRestaurantDetail = (restaurantID) => (dispatch) => (dispatch) => axois.get()
  .then((res) => dispatch(getRestaurantDetail_(res.data)));
