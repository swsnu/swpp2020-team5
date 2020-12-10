import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  selectedReviews: [],
  myReviews: [
  ],
  otherReviews: {
    naver: [
    ],
    kakao: [
    ],
    atm: [
    ],
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_OTHER_REVIEWS:
      return { ...state, otherReviews: action.target };
    case actionTypes.GET_MY_REVIEWS:
      return { ...state, myReviews: action.target };
    case actionTypes.EDIT_MY_REVIEW: {
      const deleted = state.myReviews.filter((review) => review.id !== action.id);
      const newReview = {
        id: action.id,
        content: action.content,
        rating: action.rating,
        date: action.date,
      };
      return { ...state, myReviews: [...deleted, newReview] };
    }
    case actionTypes.POST_MY_REVIEW: {
      const newReview = {
        id: action.id,
        content: action.content,
        rating: action.rating,
        date: action.date,
      };
      return { ...state, myReviews: [...state.myReviews, newReview] };
    }
    case actionTypes.DELETE_MY_REVIEW: {
      console.log(action.target)
      const deleted = state.myReviews.filter((review) => review.id !== action.target);
      console.log(deleted)
      return { ...state, myReviews: [...deleted] };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
