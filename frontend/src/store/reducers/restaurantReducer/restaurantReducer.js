import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  restaurantlist:[
    {id:1, title:'swpp', rate:3.3,img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download'}  ],
  
};
const reducer = (state = initialState, action) => {
  switch(actionTypes) {
    case actionTypes.GET_RESTAURANTLIST:
      return {...state, restaurantlist: action.restaurantlist};
    default: 
      break;

  }
  return state;
};

export default reducer;