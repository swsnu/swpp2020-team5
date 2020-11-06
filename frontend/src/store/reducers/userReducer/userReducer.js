import * as actionTypes from '../../actions/actionTypes'

const initialState = {
  searchLocation: {
    address: {
      address_name: '서울 관악구',
      b_code: '1162000000',
      h_code: '1162000000',
      main_address_no: '',
      mountain_yn: 'N',
      region_1depth_name: '서울',
      region_2depth_name: '관악구',
      region_3depth_h_name: '',
      region_3depth_name: '',
      sub_address_no: '',
      x: '126.951561853868',
      y: '37.4783683761333'
    },
    address_name: '서울 관악구',
    address_type: 'REGION',
    road_address: null,
    x: '126.951561853868',
    y: '37.4783683761333'
  },
  selectedUser: [
    { 
      id: 0,
      username: '',
      preferenceVector: {
        taste1: 1,
        taste2: 2,
        taste3: 3,
      },
      foodCategory: {
        Korean: true,
        Western: true,
        Chinese: false,
        Vietnamese: false,
      },
      searchLocation: {
        address_name: '',
        latiture: 0,
        longitute: 0,
      },
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
