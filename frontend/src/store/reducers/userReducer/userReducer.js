import * as actionTypes from '../../actions/actionTypes';

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
    양식: true,
    중식: true,
    일식: true,
    카페: false,
    패스트푸드: true,
    베트남음식: true,
    분식: false,
    디저트: true,
    주점: false,
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
      y: '37.4783683761333',
    },
    address_name: '서울 관악구',
    address_type: 'REGION',
    road_address: null,
    x: '126.951561853868',
    y: '37.4783683761333',
  },
};

// preferenceVector form should be like {'factorOne': 3, 'factorTwo': 4}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return { ...state, selectedUser: action.target };
    case actionTypes.GET_FOOD_CATEGORY:
    case actionTypes.EDIT_FOOD_CATEGORY:
      return { ...state, foodCategory: action.target };
    case actionTypes.GET_SEARCH_LOCATION:
      return {...state, searchLocation: action.target};
    case actionTypes.EDIT_SEARCH_LOCATION:
      return { ...state, searchLocation: action.target };
    case actionTypes.GET_PREFERENCE_VECTOR:
    case actionTypes.EDIT_PREFERENCE_VECTOR:
      return { ...state, preferenceVector: action.target };
    default:
      break;
  }
  return state;
};

export default reducer;
