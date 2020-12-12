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
  address_name: '서울 관악구',
  x: '126.951561853868',
  y: '37.4783683761333',
};

describe('actionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('getUser should get users info correctly', (done) => {
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
  it('getUser should process error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        reject(new Error('error'));
      }));
    store.dispatch(actionCreators.getUser()).then(() => {
      const newState = store.getState();
      expect(newState.us.selectedUser).toBe(null);
      done();
    });
  });
  it('checkUser should do correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((username, email) => new Promise((resolve, reject) => {
        const result = {
          status: 201,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.checkUser('sug', 'sug_email')).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      const newState = store.getState();
      expect(newState.us.checkUserStatus).toBe('NotExist');
      done();
    });
  });
  it('checkUser should handler error 401', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((username, email) => new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 401,
          },
        };
        reject(result);
      }));
    store.dispatch(actionCreators.checkUser('sug', 'sug_email')).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      const newState = store.getState();
      expect(newState.us.checkUserStatus).toBe('Exist');
      done();
    });
  });
  it('checkUser should handler error not 401', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((username, email) => new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 404,
          },
        };
        reject(result);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.checkUser('sug', 'sug_email')).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledWith('checkUser error');
      done();
    });
  });
  it('resetCheckUser should do correctly', () => {
    store.dispatch(actionCreators.resetCheckUser());
    const newState = store.getState();
    expect(newState.us.checkUserStatus).toBe('NotYet');
  });
  it('signup should do correctly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, user) => new Promise((resolve, reject) => {
        const result = {
          status: 201,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.postSignUp(null)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('signup should handle error correctly at 409', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, user) => new Promise((resolve, reject) => {
        const response = {
          response: {
            status: 409,
          },
        };
        reject(response);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.postSignUp(null)).then(() => {
      expect(spyAlert).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledWith('이미 등록된 회원입니다!');
      done();
    });
  });
  it('signup should handle error correctly not at 409', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, user) => new Promise((resolve, reject) => {
        const response = {
          response: {
            status: 401,
          },
        };
        reject(response);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.postSignUp(null)).then(() => {
      expect(spyAlert).toHaveBeenCalledTimes(1);
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

  it('post signin should process error', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, user) => new Promise((resolve, reject) => {
        const result = {
          status: 400,
          data: stubUser,
        };
        reject(result);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.postSignIn('a', 'a')).then((err) => {
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('signout should do correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, user) => new Promise((resolve, reject) => {
        const result = {
          status: 204,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.getSignOut()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('signout should handle error correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, user) => new Promise((resolve, reject) => {
        const result = {
          status: 401,
        };
        reject(result);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.getSignOut()).then(() => {
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  /*
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
  */
  it('edit foodcategory should edit user foodcategory correctly', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, foodcategory) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubFoodCategory,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.editFoodCategory(stubFoodCategory)).then(() => {
      const newState = store.getState();
      expect(newState.us.foodCategory).toBe(stubFoodCategory);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('editfoodcategory handle error correctly', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, foodcategory) => new Promise((resolve, reject) => {
        const result = {
          status: 400,
          data: stubFoodCategory,
        };
        reject(result);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.editFoodCategory(stubFoodCategory)).then(() => {
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should get user searchLocation correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubSearchLocation,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.getSearchLocation()).then(() => {
      const newState = store.getState();
      expect(newState.us.searchLocation).toBe(stubSearchLocation);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('getSearchLocation should handle error correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 400,
          data: stubSearchLocation,
        };
        reject(result);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.getSearchLocation()).then(() => {
      expect(spyAlert).toHaveBeenCalledTimes(1);
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
    store.dispatch(actionCreators.editSearchLocation(stubSearchLocation)).then(() => {
      const newState = store.getState();
      expect(newState.us.searchLocation).toBe(stubSearchLocation);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('editSearchLocation should handle error correctly', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, searchLocation) => new Promise((resolve, reject) => {
        const result = {
          status: 400,
          data: stubSearchLocation,
        };
        reject(result);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.editSearchLocation(stubSearchLocation)).then(() => {
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('get preferenceVector should get user preferenceVector correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubPreferenceVector,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.getPreferenceVector()).then(() => {
      const newState = store.getState();
      expect(newState.us.preferenceVector).toBe(stubPreferenceVector);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('getPreferenceVector should handle error correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 400,
          data: stubPreferenceVector,
        };
        reject(result);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.getPreferenceVector(stubPreferenceVector)).then(() => {
      expect(spyAlert).toHaveBeenCalledTimes(1);
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
    store.dispatch(actionCreators.editPreferenceVector(stubPreferenceVector)).then(() => {
      const newState = store.getState();
      expect(newState.us.preferenceVector).toBe(stubPreferenceVector);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('editPreferenceVector should handler error correctly', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, preferenceVector) => new Promise((resolve, reject) => {
        const result = {
          status: 400,
          data: stubPreferenceVector,
        };
        reject(result);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.editPreferenceVector(stubPreferenceVector)).then(() => {
      expect(spyAlert).toHaveBeenCalledTimes(1);
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
  it('getFoodCategory should handle error correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 400,
          data: stubFoodCategory,
        };
        reject(result);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.getFoodCategory()).then(() => {
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
