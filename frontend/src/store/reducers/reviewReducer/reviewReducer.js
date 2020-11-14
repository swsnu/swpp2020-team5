import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  selectedReviews: [],
  myReviews: [
    {
      id: 10,
      content: '국물 맛이 좋다',
      rating: 5,
      modifiedTime: new Date(),
    },
  ],
  otherReviews: {
    naver: [
      {
        content: '맛있으나 불친절하다.',
        rating: 2.5,
        createTime: new Date(),
        authorName: '사용자1',
      },
      {
        content: '불친절해서 좋아요',
        rating: 1.5,
        createTime: new Date(),
        authorName: '사용자3',
      },
      {
        content: '너무 매웠던 것 빼고는 그런대로 만족합니다.',
        rating: 3.5,
        createTime: new Date(),
        authorName: '사용자4',
      },
    ],
    kakao: [
      {
        content: '최고인듯',
        rating: 5.0,
        createTime: new Date(),
        authorName: '사용자2',
      },
    ],
    atm: [
      {
        content: '최고인듯',
        rating: 5.0,
        createTime: new Date(),
        authorName: '사용자2',
      },
      {
        content: '불친절해서 좋아요',
        rating: 1.5,
        createTime: new Date(),
        authorName: '사용자3',
      },
    ],
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REVIEWS:
      return { ...state, selectedReviews: action.target };
    case actionTypes.PUT_REVIEW: {
      const deleted = state.myReviews.filter((review) => review.id !== action.id);
      const newReview = {
        id: action.id,
        content: action.content,
        rating: action.rating,
        modifiedTime: action.modifiedTime,
      };
      return { ...state, myReviews: [...deleted, newReview] };
    }
    case actionTypes.POST_REVIEW: {
      const newReview = {
        // THis needs to be fixed when backend imple
        id: action.id,
        content: action.content,
        rating: action.rating,
        modifiedTime: action.modifiedTime,
      };
      return { ...state, myReviews: [...state.myReviews, newReview] };
    }
    case actionTypes.DELETE_REVIEW: {
      // console.log(action.target)
      const deleted = state.myReviews.filter((review) => review.id !== action.target);
      return { ...state, myReviews: [...deleted] };
    }
    default:
      // console.log('not actions implemented');
      break;
  }

  return state;
};

export default reducer;
