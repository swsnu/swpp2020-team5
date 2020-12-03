import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  restaurantlist: [],
  selectedRestaurant: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RESTAURANTLIST:
      return { ...state, restaurantlist: action.restaurantlist };
    case actionTypes.GET_RESTAUARANTDETAIL:
      return { ...state, selectedRestaurant: action.selectedRestaurant };
    default:
      break;
  }
  return state;
};

export default reducer;
