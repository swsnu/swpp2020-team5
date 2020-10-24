import * as actionTypes from '../actionTypes'
import axios from 'axios'

export const changeLocation_ = (searchingLocation) => {
  return { type: actionTypes.CHANGE_LOCATION, searchingLocation: searchingLocation};
}

export const changeLocation = (searchingLocation) => {
  // no db managements yet
  return dispatch => {
    dispatch(changeLocation_(searchingLocation));
  }
}