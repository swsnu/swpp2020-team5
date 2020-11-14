import axios from 'axios';
import { ExpansionPanelActions, jssPreset } from '@material-ui/core';
import { faItalic } from '@fortawesome/free-solid-svg-icons';
import * as actionCreators from './userActions';
import store from '../../store';

const stubUser = {
  id: 0,
  username: '우렁쌈밥',
};
const stubPreferenceVector = {
  taste1: 1,
  taste2: 2,
  taste3: 3,
};
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
};
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
};

describe('actionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('getUsers should get users info correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUser,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.getUser(0)).then(() => {
      const newState = store.getState();
      expect(newState.us.selectedUser).toBe(stubUser);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('post signin should post email and password correctly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, user) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUser,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.postSignIn('a', 'a')).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('edit user should edit user info properly', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, user) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUser,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.editUser(stubUser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('edit foodcategory should edit user foodcategory correctly', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, foodcategory) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubFoodCategory,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.editUserFoodCategory(stubFoodCategory)).then(() => {
      const newState = store.getState();
      expect(newState.us.foodCategory).toBe(stubFoodCategory);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('should edit user searchLocation correctly', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, searchLocation) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubSearchLocation,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.changeLocation(stubSearchLocation)).then(() => {
      const newState = store.getState();
      expect(newState.us.searchLocation).toBe(stubSearchLocation);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('edit preferenceVector should edit user preferenceVector correctly', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, preferenceVector) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubPreferenceVector,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.putPreferenceVector(stubPreferenceVector)).then(() => {
      const newState = store.getState();
      expect(newState.us.preferenceVector).toBe(stubPreferenceVector);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('should get user foodCategory correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubFoodCategory,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.getFoodCategory()).then(() => {
      const newState = store.getState();
      expect(newState.us.foodCategory).toBe(stubFoodCategory);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
