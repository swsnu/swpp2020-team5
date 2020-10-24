import * as actionTypes from '../actionTypes'
import axios from 'axios'

export const changeLocation_ = (searchLocation) => {
  return { type: actionTypes.CHANGE_LOCATION, searchLocation: searchLocation};
}

export const changeLocation = (searchLocation) => {
  // no db managements yet
  return dispatch => {
    dispatch(changeLocation_(searchLocation));
  }
}