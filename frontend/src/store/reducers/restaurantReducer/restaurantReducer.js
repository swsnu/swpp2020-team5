import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  restaurantlist:[
    {id:1, title:'swpp', 
    rate:3.3,
    img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
    menu:'짜장면 600원 탕수육 200원',
    time:'9;00-12:00',
    keywords:['맵다','짜다','분위기가 좋다'],
  },
    {id:2, title:'jjjjj', rate:3.5, img_url:'https://upload.wikimedia.org/wikipedia/commons/e/e9/Korean.cuisine-Jajangmyeon-01.jpg'}],
    selectedrestaurant:{id:1, title:'swpp', 
    rate:3.3,
    img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
    menu:'짜장면 600원 탕수육 200원',
    time:'9;00-12:00',keywords:['맵다','짜다','분위기가 좋다']},
    

  };
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_RESTAURANTLIST:
      return {...state, restaurantlist: action.restaurantlist};
    
    case actionTypes.GET_RESTAURANTNAME:
      return {...state,restaurantlist:action.searchedlist};
    case actionTypes.GET_RESTAUARANTDETAIL:
      return {...state,selectedrestaurant:action.selectedrestaurant};
    default: 
      break;

  }
  return state;
};

export default reducer;