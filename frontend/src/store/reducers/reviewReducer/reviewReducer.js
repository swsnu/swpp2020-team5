import * as actionTypes from '../../actions/actionTypes';

const initialState = {
<<<<<<< HEAD
  myReview: [
    {reviewID: 0, content: 'hello', createTime: 13}, {reviewID: 1, content: 'this is', createTime: 14}, {reviewID: 2, content: 'myReview', createTime: 15}
  ],
  otherReview: [
    {reviewID: 3, content: 'and', createTime: 13}, {reviewID: 4, content: 'here is', createTime: 14}, {reviewID: 5, content: 'otherReview', createTime: 15}
=======
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
>>>>>>> 8489738c3b0a578df4e78ca09bb96a0050e212f6
  ],
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REVIEWS:
<<<<<<< HEAD
      return {...state, selectedRestaurantReviews: action.target};
    default: break;
=======
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
>>>>>>> 8489738c3b0a578df4e78ca09bb96a0050e212f6
  }

  return state;
}

export default reducer;
