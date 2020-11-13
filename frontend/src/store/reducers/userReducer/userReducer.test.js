import React from 'react';
import reducer from './userReducer';
import * as actionTypes from '../../actions/actionTypes';

const stubUser = {
    id: 0,
    username: '우렁쌈밥',
}
const stubPreferenceVector = {
    taste1: 1,
    taste2: 2,
    taste3: 3,
}
const stubFoodCategory = {
    한식: true,
    양식: true,
    중식: true,
    일식: true,
    카페: false,
    패스트푸드: true,
    베트남음식: true,
    분식: false,
    디저트: true,
    주점: false,
}
const stubSearchLocation = {
    address: {
      address_name: '서울 관악구',
      b_code: '1162000000',
      h_code: '1162000000',
      main_address_no: '',
      mountain_yn: 'N',
      region_1depth_name: '서울',
      region_2depth_name: '관악구',
      region_3depth_h_name: '',
      region_3depth_name: '',
      sub_address_no: '',
      x: '126.951561853868',
      y: '37.4783683761333',
    },
    address_name: '서울 관악구',
    address_type: 'REGION',
    road_address: null,
    x: '126.951561853868',
    y: '37.4783683761333',
  }


const stubInitialState = {
  selectedUser: null,
  preferenceVector: null,
  foodCategory: null,
  searchLocation: null
};

describe('user reducer', () => {
  it('should render properly', () => {
    const newState = reducer(stubInitialState, {});
    expect(newState).toEqual({
      selectedUser: null,
      preferenceVector: null,
      foodCategory: null,
      searchLocation: null
    });
  });

  it('should get user properly', () => {
    const newState = reducer(stubInitialState, {
      type : actionTypes.GET_USER,
      target: stubUser
    });
    expect(newState).toEqual({
      selectedUser: stubUser,
      preferenceVector: null,
      foodCategory: null,
      searchLocation: null
    });  
  });

  it('should get searchLocation properly', () => {
    const newState = reducer(stubInitialState, {
      type : actionTypes.GET_LOCATION,
      target: stubSearchLocation
    });
    expect(newState).toEqual({
      selectedUser: null,
      preferenceVector: null,
      foodCategory: null,
      searchLocation: stubSearchLocation
    });  
  });

  it('should change searchLocation properly', () => {
    const newState = reducer(stubInitialState, {
      type : actionTypes.CHANGE_LOCATION,
      target: stubSearchLocation
    });
    expect(newState).toEqual({
      selectedUser: null,
      preferenceVector: null,
      foodCategory: null,
      searchLocation: stubSearchLocation
    });  
  });

  it('should get preferenceVector properly', () => {
    const newState = reducer(stubInitialState, {
      type : actionTypes.GET_PREFERENCE_VECTOR,
      target: stubPreferenceVector
    });
    expect(newState).toEqual({
      selectedUser: null,
      preferenceVector: stubPreferenceVector,
      foodCategory: null,
      searchLocation: null
    });  
  });

  it('should change preferenceVector properly', () => {
    const newState = reducer(stubInitialState, {
      type : actionTypes.PUT_PREFERENCE_VECTOR,
      target: stubPreferenceVector
    });
    expect(newState).toEqual({
      selectedUser: null,
      preferenceVector: stubPreferenceVector,
      foodCategory: null,
      searchLocation: null
    });  
  });

  it('should get foodCategory properly', () => {
    const newState = reducer(stubInitialState, {
      type : actionTypes.GET_FOODCATEGORY,
      target: stubFoodCategory
    });
    expect(newState).toEqual({
      selectedUser: null,
      preferenceVector: null,
      foodCategory: stubFoodCategory,
      searchLocation: null
    });  
  });

  it('should change foodCategory properly', () => {
    const newState = reducer(stubInitialState, {
      type : actionTypes.PUT_FOODCATEGORY,
      target: stubFoodCategory
    });
    expect(newState).toEqual({
      selectedUser: null,
      preferenceVector: null,
      foodCategory: stubFoodCategory,
      searchLocation: null
    });  
  });


});
