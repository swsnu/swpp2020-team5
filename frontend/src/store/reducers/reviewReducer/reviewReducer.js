import * as actionTypes from '../../actions/actionTypes.js';

const initialState = {
  selectedRestaurantReviews: [
    {title: 'It is nice!!', content: 'NIce NICE excellent!!1', link: 'naver'},
    {title: 'It is good!!', content: 'GOod GOOD excellent!!2', link: 'kakao'},
    {title: 'It is best!!', content: 'BEst BEST excellent!!3', link: 'mango'},
  ], 
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RESTAURANT_REVIEWS:
      return {...state, selectedRestaurantReviews: action.target};
    default: break;
  }

  return state;
}

export default reducer;
