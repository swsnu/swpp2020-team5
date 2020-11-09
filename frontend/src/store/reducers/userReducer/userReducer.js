import * as actionTypes from '../../actions/actionTypes'

const initialState = {
  selectedUser: { 
    id: 0,
    username: '우렁쌈밥',
  },
  preferenceVector: {
    taste1: 1,
    taste2: 2,
    taste3: 3,
  },
  foodCategory: {
    한식: true,
    양식: false,
    중식: false,
    일식: true,
    
  },
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
    case actionTypes.GET_FOODCATEGORY:
      return {...state,foodCategory:action.foodCategory};
    default: break;

  }
  return state;
}

export default reducer;
