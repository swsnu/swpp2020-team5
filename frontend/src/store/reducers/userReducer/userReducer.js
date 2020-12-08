import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  isSignIn: false,
  selectedUser: {
    id: 0,
    name: '우렁쌈밥',
  },
  currentPreferenceVector: {
    '매운': 10, '느끼한': 30, '짭짤한': 50, '달달한': 10, '고소한': 3,
    '싱거운': 5, '담백한': 1, '바삭바삭한': 3, '부드러운': 5, '저렴한': 1,
    '웨이팅이있는': 1, '혼밥하기좋은': 3, '불친절한': 5
  },
  adjustedPreferenceVector: {
    '매운': 1, '느끼한': 3, '짭짤한': 5, '달달한': 1, '고소한': 3,
    '싱거운': 5, '담백한': 1, '바삭바삭한': 3, '부드러운': 5, '저렴한': 1,
    '웨이팅이있는': 1, '혼밥하기좋은': 3, '불친절한': 5
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
  checkUserStatus: 'NotYet',
};

// preferenceVector form should be like {'factorOne': 3, 'factorTwo': 4}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return { ...state, selectedUser: action.target, isSignIn: true };
      return { ...state, selectedUser: action.target };
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
      let adjustedVector = action.target;
      let preferenceVector = {...action.target};
      console.log(action.target)
      for (const key in preferenceVector) {
        preferenceVector[key] = preferenceVector[key] * 10;
      }
      return {...state, currentPreferenceVector: preferenceVector,
              adjustedPreferenceVector: adjustedVector};
    case actionTypes.EDIT_PREFERENCE_VECTOR:
      let editedPreferenceVector = {...action.target};
      for (const key in editedPreferenceVector) {
        editedPreferenceVector[key] = editedPreferenceVector[key] * 10;
      }
      return { ...state, currentPreferenceVector: editedPreferenceVector,
              adjustedPreferenceVector: action.target };
    case actionTypes.GET_SIGN_OUT:
      return {...state, isSignIn: false};
    case actionTypes.POST_SIGN_IN:
      return {...state, isSignIn: true};
    default:
      break;
  }
  return state;
};

export default reducer;
