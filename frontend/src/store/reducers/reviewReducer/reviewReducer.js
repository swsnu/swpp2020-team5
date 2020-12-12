import * as actionTypes from '../../actions/actionTypes';

const initialState = {
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
      const newReviewList = [...action.target];
      newReviewList.sort((a,b) => b.id-a.id);
      return { ...state, myReviews: newReviewList };
    case actionTypes.EDIT_MY_REVIEW: {
      const newReviewList = [...state.myReviews];
      newReviewList.forEach(review => {
        if (review.id === action.target.id) {
          review.content = action.target.content;
          review.rating = action.target.rating;
          review.date = action.target.date;
        }
      });
      return { ...state, myReviews: newReviewList };
    }
    case actionTypes.POST_MY_REVIEW: {
      const newReview = {
        id: action.id,
        content: action.content,
        rating: action.rating,
        date: action.date,
      };
      return { ...state, myReviews: [newReview, ...state.myReviews] };
    }
    case actionTypes.DELETE_MY_REVIEW: {
      const newReviewList = [...state.myReviews];
      const deleted = newReviewList.filter((review) => review.id !== action.target);
      return { ...state, myReviews: deleted };
    }
    default:
      break;
  }
  return { ...state };
};

export default reducer;
