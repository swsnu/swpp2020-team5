import axios from 'axios';
import * as actionTypes from '../actionTypes';

// Handling CSRF-Token
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const getRestaurantList_ = (restaurantlist) => ({
  type: actionTypes.GET_RESTAURANTLIST, restaurantlist,
});

export const getRestaurantList = (name) => (dispatch) => axios
  .get(`/atm/restaurant/search/${name}`)
  .then((res) => {
    dispatch(getRestaurantList_(res.data));
  })
  .catch((err) => {
    alert('Not Logined');
  });


// export const getRestaurantName_ = (searchedlist) => ({
//   type: actionTypes.GET_RESTAURANTNAME, searchedlist
// });
// export const getRestaurantName = () => (dispatch) => axois.get()
//   .then((res) => dispatch(getRestaurantName_(res.data)));

export const getRestaurantDetail_ = (selectedRestaurant) => ({
  type: actionTypes.GET_RESTAUARANTDETAIL, selectedRestaurant,
});
export const getRestaurantDetail = (restaurantID) => (_dispatch) => (dispatch) => axios
  .get(`/atm/restaurant/detail/${restaurantID}`)
  .then((res) => {
    dispatch(getRestaurantDetail_(res.data));
  })
  .catch((err) => {
    alert('Not Logined');
  });

