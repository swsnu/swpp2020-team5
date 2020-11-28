import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  selectedReviews: [],
  myReviews: [
    {
      id: 10,
      content: '국물 맛이 좋다',
      rating: 5,
      date: '',
    },
  ],
  otherReviews: {
    naver: [
      {
        content: '맛있으나 불친절하다.',
        rating: 2.5,
        date: '',
        authorName: '사용자1',
      },
      {
        content: '불친절해서 좋아요',
        rating: 1.5,
        date: '',
        authorName: '사용자3',
      },
      {
        content: '너무 매웠던 것 빼고는 그런대로 만족합니다.',
        rating: 3.5,
        date: '',
        authorName: '사용자4',
      },
    ],
    kakao: [
      {
        content: '최고인듯',
        rating: 5.0,
        date: '',
        authorName: '사용자2',
      },
    ],
    atm: [
      {
        content: '최고인듯',
        rating: 5.0,
        date: '',
        authorName: '사용자2',
      },
      {
        content: '불친절해서 좋아요',
        rating: 1.5,
        date: '',
        authorName: '사용자3',
      },
    ],
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_OTHER_REVIEWS:
      return { ...state, selectedReviews: action.target };
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
      const deleted = state.myReviews.filter((review) => review.id !== action.target);
      return { ...state, myReviews: [...deleted] };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
