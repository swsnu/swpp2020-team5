import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  restaurantlist:[
    {id:1, title:'swpp', 
    rate:3.3,
    img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
    menu:['짜장면 6000원' ,'탕수육 2000원'],
    time:'9;00-12:00',
    keywords:['맵다','짜다','분위기가 좋다'],
    category:['일식'],
    difference:0.43,
  },
  {id:2, title:'안녕부산', 
  rate:3.3,
  img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
  menu:['짜장면 6000원' ,'탕수육 2000원'],
  time:'9;00-12:00',
  keywords:['맵다','짜다','분위기가 좋다'],
  category:['베트남식'],
  difference:0.43,
  },
  {id:3, title:'안녕베트남', 
  rate:3.3,
  img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
  menu:['짜장면 6000원' ,'탕수육 2000원'],
  time:'9;00-12:00',
  keywords:['맵다','짜다','분위기가 좋다'],
  category:['일식'],
  difference:0.43,
  },
  {id:4, title:'요츠야텐동', 
    rate:3.3,
    img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
    menu:['짜장면 6000원' ,'탕수육 2000원'],
    time:'9;00-12:00',
    keywords:['맵다','짜다','분위기가 좋다'],
    category:['한식','중식','일식'],
    difference:0.43,
  },{id:5, title:'요츠야텐동', 
  rate:3.3,
  img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
  menu:['짜장면 6000원' ,'탕수육 2000원'],
  time:'9;00-12:00',
  keywords:['맵다','짜다','분위기가 좋다'],
  category:['한식','중식','일식'],
  difference:0.43,
},{id:6, title:'요츠야텐동', 
rate:3.3,
img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
menu:['짜장면 6000원' ,'탕수육 2000원'],
time:'9;00-12:00',
keywords:['맵다','짜다','분위기가 좋다'],
category:['한식','중식','일식'],
difference:0.43,
},{id:7, title:'요츠야텐동', 
rate:3.3,
img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
menu:['짜장면 6000원' ,'탕수육 2000원'],
time:'9;00-12:00',
keywords:['맵다','짜다','분위기가 좋다'],
category:['한식','중식','일식'],
difference:0.43,
},
],
    selectedRestaurant:{id:1, title:'swpp', 
    rate:3.3,
    img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
    menu:['짜장면 6000원', '탕수육 2000원','15000원대표반쎄오25000원대표보느'
    ,'12000원'
    ,'분짜'
    ],
    time:'9;00-12:00',keywords:['맵다','짜다','분위기가 좋다']
  ,category:['한식','중식','일식'],
  difference:0.43,
  },
    
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
