import * as actionTypes from '../../actions/actionTypes'

const initialState = {
  searchLocation: null,
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.CHANGE_LOCATION:
      return {...state, searchLocation: action.searchLocation};
  }
  return state;
}

export default reducer;