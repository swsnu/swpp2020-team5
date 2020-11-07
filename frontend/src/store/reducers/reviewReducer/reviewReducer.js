import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  myReviews: [
    {
      id: 0,
      content: 'Nice food',
      rating: 3.5,
      modifiedTime: new Date(),
    },
  ],
  otherReviews: [
    {
      content: 'Nice for me',
      rating: 2.5,
      modifiedTime: new Date(),
      authorName: 'zebra',
      link: 'naver',
    },
  ],
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REVIEWS:
      return {...state, selectedReviews: action.target};
    case actionTypes.PUT_REVIEW: {
      const deleted = state.myReviews.filter(review => { return review.id !== action.id; });
      const newReview = {
        id: action.id,
        content: action.content,
        rating: action.rating,
        modifiedTime: action.modifiedTime,
      }
      return {...state, myReviews: [...deleted, newReview]};
    }
    case actionTypes.DELETE_REVIEW: {
      const deleted = state.myReviews.filter(review => { return review.id !== action.id; });
      return {...state, myReviews: [...deleted]};
    }
    default: 
      break;
  }

  return state;
}

export default reducer;
