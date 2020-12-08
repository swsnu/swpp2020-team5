import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  isSignIn: false,
  selectedUser: {
    id: 0,
    name: '우렁쌈밥',
  },
  preferenceVector: {},
  foodCategory: {},
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
      y: '37.4783683761333',
    },
    address_name: '서울 관악구',
    address_type: 'REGION',
    road_address: null,
    x: '126.951561853868',
    y: '37.4783683761333',
  },
  checkUserStatus: 'NotYet',
};

// preferenceVector form should be like {'factorOne': 3, 'factorTwo': 4}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return { ...state, selectedUser: action.target, isSignIn: true };
    case actionTypes.CHECK_USER:
      return { ...state, checkUserStatus: action.target };
    case actionTypes.RESET_CHECK_USER:
      return { ...state, checkUserStatus: 'NotYet'};
    case actionTypes.GET_FOOD_CATEGORY:
    case actionTypes.EDIT_FOOD_CATEGORY:
      return { ...state, foodCategory: action.target };
    case actionTypes.GET_SEARCH_LOCATION:
      return {...state, searchLocation: action.target};
    case actionTypes.EDIT_SEARCH_LOCATION:
      return { ...state, searchLocation: action.target };
    case actionTypes.GET_PREFERENCE_VECTOR:
      return {...state, preferenceVector: action.target };
    case actionTypes.EDIT_PREFERENCE_VECTOR:
      return {...state, preferenceVector: action.target };
    case actionTypes.GET_SIGN_OUT:
      sessionStorage.removeItem("isSignIn");
      return {...state, isSignIn: false};
    case actionTypes.POST_SIGN_IN:
      sessionStorage.isSignIn = true;
      return {...state, isSignIn: true};  
    default:
      break;
  }
  return state;
};

export default reducer;
