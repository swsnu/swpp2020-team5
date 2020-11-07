import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  myReview: [
    {reviewID: 0, content: 'hello', createTime: 13}, {reviewID: 1, content: 'this is', createTime: 14}, {reviewID: 2, content: 'myReview', createTime: 15}
  ],
  otherReview: [
    {reviewID: 3, content: 'and', createTime: 13}, {reviewID: 4, content: 'here is', createTime: 14}, {reviewID: 5, content: 'otherReview', createTime: 15}
  ],
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REVIEWS:
      return {...state, selectedRestaurantReviews: action.target};
    default: break;
  }

  return state;
}

export default reducer;
