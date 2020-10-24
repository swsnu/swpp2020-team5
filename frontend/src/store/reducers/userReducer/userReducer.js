import * as actionTypes from '../../actions/actionTypes'

const initialState = {
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
  ]
}
const reducer = (state = initialState, action) => {
  switch (action.types) {
    case actionTypes.GET_USER:
      return { ...state, selectedUser: action.target }
  }
  return state;
}

export default reducer;
