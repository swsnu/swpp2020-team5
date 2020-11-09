import * as actionTypes from '../../actions/actionTypes';

// for display only, remove later
import cafe from '../../../images/background.jpg'
import shrimp from '../../../images/shrimp.jpg'
import potato from '../../../images/potato.jpg'
import chex from '../../../images/chex.png'

const initialState = {
  restaurantlist:[
    {id:1, title:'맘스터치', 
      rate:4.78,
      // img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
      img_src: potato,
      menu:['짜장면 6000원' ,'탕수육 2000원'],
      time:'9;00-12:00',
      keywords:['맵다','짜다','분위기가 좋다'],
      preferenceVector:{
        '감자': 4.8,
        '느끼한': 4.5,
        '바삭한': 4.4,
      },
      category:['패스트푸드'],
      difference:0.43,
    },
    {id:3, title:'유동커피', 
      rate:4.65,
      // img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
      img_src: cafe,
      menu:['짜장면 6000원' ,'탕수육 2000원'],
      time:'9;00-12:00',
      keywords:['맵다','짜다','분위기가 좋다'],
      category:['카페'],
      difference:0.43,
      preferenceVector:{
        '아늑한': 5.0,
        '푸짐한': 4.8,
        '달콤한': 3.6,
      },
    },
    {id:4, title:'김포 어딘가', 
      rate:4.44,
      // img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
      img_src: shrimp,
      menu:['짜장면 6000원' ,'탕수육 2000원'],
      time:'9;00-12:00',
      keywords:['맵다','짜다','분위기가 좋다'],
      category:['일식', '주점'],
      difference:0.43,
      preferenceVector:{
        '대기가 많은': 4.8,
        '고급진': 4.0,
        '친절한': 3.9,
      },
    },
    {id:5, title:'중흥순대국', 
      rate:4.36,
      // img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
      img_src: chex,
      menu:['짜장면 6000원' ,'탕수육 2000원'],
      time:'9;00-12:00',
      keywords:['맵다','짜다','분위기가 좋다'],
      category:['한식', '시리얼'],
      difference:0.43,
      preferenceVector:{
        '고급진': 4.8,
        '대파': 4.7,
        '푸짐한': 2.6,
      },
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
