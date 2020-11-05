import * as actionTypes from '../../actions/actionTypes'

const initialState = {
  searchLocation: null,
  selectedUser: [
    { 
      id: 0,    // user ID
      user: null,  // user object from backend
      preference: {
        'taste1': 1,
        'taste2': 2,
        'taste3': 3,
      },
      foodCategory: {
        Korean: true,
        Western: true,
        Chinese: false,
        Vietamese: false,
      },
      searchLocation: '',
    },
  ],
}

//preference form should be like {'factorOne': 3, 'factorTwo': 4}
const reducer = (state = initialState, action) => {
  switch(action.type){
		case actionTypes.GET_USER:
      return { ...state, user: action.target }
    case actionTypes.CHANGE_LOCATION:
      return {...state, searchLocation: action.searchLocation};
    case actionTypes.CHANGE_PREFERENCE_VECTOR:
      let updatedUser = action.target;
      return {...state, currentUser: updatedUser};
    default: break;
  }
  return state;
}

export default reducer;
