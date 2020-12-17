import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  selectedUser: {
    id: 0,
    name: '우렁쌈밥',
  },
  preferenceVector: {},
  foodCategory: {},
  searchLocation: {
    address_name: '서울 관악구',
    x: '126.951561853868',
    y: '37.4783683761333',
    radius: 10,
  },
  checkUserStatus: 'NotYet',
  isGetUserCalled: false,
  tabMode: null,
};

// preferenceVector form should be like {'factorOne': 3, 'factorTwo': 4}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return { ...state, selectedUser: action.target, isGetUserCalled: true };
    case actionTypes.CHECK_USER:
      return { ...state, checkUserStatus: action.target };
    case actionTypes.RESET_CHECK_USER:
      return { ...state, checkUserStatus: 'NotYet' };
    case actionTypes.GET_FOOD_CATEGORY:
    case actionTypes.EDIT_FOOD_CATEGORY:
      return { ...state, foodCategory: action.target };
    case actionTypes.GET_SEARCH_LOCATION:
      return { ...state, searchLocation: action.target };
    case actionTypes.EDIT_SEARCH_LOCATION:
      return { ...state, searchLocation: action.target };
    case actionTypes.GET_PREFERENCE_VECTOR:
      return { ...state, preferenceVector: action.target };
    case actionTypes.EDIT_PREFERENCE_VECTOR:
      return { ...state, preferenceVector: action.target };
    case actionTypes.GET_CURRENT_TAB:
      return { ...state, tabMode: action.target };
    case actionTypes.EDIT_CURRENT_TAB:
      return { ...state, tabMode: action.target };
    case actionTypes.GET_SIGN_OUT:
      return { ...state, isGetUserCalled: false };
    case actionTypes.POST_SIGN_IN:
      return { ...state, isGetUserCalled: false };
    default:
      break;
  }
  return state;
};

export default reducer;
