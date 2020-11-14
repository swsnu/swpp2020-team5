import React from 'react';
import { faItalic } from '@fortawesome/free-solid-svg-icons';
import reducer from './restaurantReducer';
import * as actionTypes from '../../actions/actionTypes';

const stubList = [
  {
    id: 1,
    title: '안녕베트남',
    rate: 4.78,
    // img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
    img_src: 'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0',
    menu: ['짜장면 6000원', '탕수육 2000원'],
    time: '9;00-12:00',
    keywords: ['맵다', '짜다', '분위기가 좋다'],
    preferenceVector: {
      느끼하다: 4.8,
      분위기: 4.5,
      웨이팅: 4.4,
    },
    category: ['베트남음식'],
    difference: 0.43,
  },
  {
    id: 3,
    title: '유동커피',
    rate: 4.65,
    // img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
    img_src: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
    menu: ['짜장면 6000원', '탕수육 2000원'],
    time: '9;00-12:00',
    keywords: ['맵다', '짜다', '분위기가 좋다'],
    category: ['카페'],
    difference: 0.43,
    preferenceVector: {
      아늑한: 5.0,
      푸짐한: 4.8,
      달콤한: 3.6,
    },
  },
];
const stubInitialState = {
  restaurantlist: [],
  selectedRestaurant: null,
};
const stubDetail = {
  id: 1,
  title: '안녕베트남',
  rate: 4.78,
  img_url: 'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0',
  menu: ['쌀국수 -------------------------- 12000원',
    '반쎄오 -------------------------- 12000원', '분짜 ----------------------------- 15000원'],
  time: '9:00-21:00',
  keywords: ['맵다', '짜다', '분위기가 좋다'],
  category: ['베트남음식'],
  difference: 0.43,
  img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2Fb72e71be49f89b3751f1572c04d5ec492c097a7733c94c0c9c33a0ed286f8c90',
    'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Fcfile9.uf.tistory.com%2Fimage%2F996B6C4D5E5B2E19091112',
    'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2Fc73c9306a12dce3dff999f0203c809ca36aca60fcae62342beeffe6b110a95ea',
    'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F24a682465f75ce1c0d096177b8c2af58a481bff828f30eb3c79830de0b122db4',
    'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2Fbe19185ce33026e9d1f24bb721efd1c5a2253f9e0a8891595d3d3fc50749d31c',
  ],
};
describe('restaurant reducer', () => {
  it('should render properly', () => {
    const newState = reducer(stubInitialState, {});
    expect(newState).toEqual({ restaurantlist: [], selectedRestaurant: null });
  });
  it('should get restaurant list properly', () => {
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_RESTAURANTLIST,
      restaurantlist: stubList,
    });
    expect(newState).toEqual({
      restaurantlist: stubList,
      selectedRestaurant: null,
    });
  });
  it('should get selected restaurant detail', () => {
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_RESTAUARANTDETAIL,
      selectedRestaurant: stubDetail,
    });
    expect(newState).toEqual({
      restaurantlist: [],
      selectedRestaurant: stubDetail,
    });
  });
});
