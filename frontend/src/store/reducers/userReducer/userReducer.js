import * as actionTypes from '../../actions/actionTypes'

const initialState = {
  searchingLocation: null,
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.CHANGE_LOCATION:
      return {...state, searchingLocation: action.searchingLocation};
  }
  return state;
}

export default reducer;