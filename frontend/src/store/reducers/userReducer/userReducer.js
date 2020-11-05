import * as actionTypes from '../../actions/actionTypes'

const initialState = {
  searchLocation: null,
  selectedUser: [
    { 
      id: 0,
      preferenceVector: [0,1,2,3],
      name: 'swppluver',
      loginID: 'swpp',
      loginPW: 'iluv',
      foodCategory: {
        Korean: true,
        Western: true,
        Chinese: false,
      },
      searchLocation: 'kwanak',
      logged_in: false,
    },
  ],
}

//preferenceVector form should be like {'factorOne': 3, 'factorTwo': 4}
const reducer = (state = initialState, action) => {
  switch(action.type){
		case actionTypes.GET_USER:
      return { ...state, selectedUser: action.target }
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
