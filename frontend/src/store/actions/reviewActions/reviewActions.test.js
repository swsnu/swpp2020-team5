import axios from 'axios';
import * as actionCreators from './reviewActions';
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

const initialState = {
  selectedReviews: [],
  myReviews: [
  ],
  otherReviews: {
    naver: [
    ],
    kakao: [
    ],
    atm: [
    ],
  },
};

const stubReviewList = [
  {
    id: 1,
    content: 'TEST_CONTENT',
    rating: 3,
    //site: 'naver'
  }
]

const stubOtherReviewList = {
  naver:[
    {
      id: 1,
      content: 'TEST_CONTENT',
      rating: 3,
    }
  ],
  kakao:[
    {
      id: 1,
      content: 'TEST_CONTENT',
      rating: 3,
    }
  ],
  atm:[
    {
      id: 1,
      content: 'TEST_CONTENT',
      rating: 3,
    }
  ],
};

const stubReview = {
  id: 10,
  content: 'TEST_REVIEW',
  rating: 1.5,
  date: '',
}

describe('review actionCreators ', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should get my-review correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubReviewList,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.getMyReviews(1)).then(() => {
      const newState = store.getState();
      expect(newState.rv.myReviews).toBe(stubReviewList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('should handle error with my-review correctly with status_code', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 401,
          }
        };
        reject(result);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.getMyReviews(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('should get other-review correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubOtherReviewList,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.getOtherReviews(1)).then(() => {
      const newState = store.getState();
      expect(newState.rv.otherReviews).toBe(stubOtherReviewList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('should handle error with other-review correctly with status_code', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 401,
          },
        };
        reject(result);
      }));
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation((message) => {});
    store.dispatch(actionCreators.getOtherReviews(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should do postMyReview correctly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, user) => new Promise((resolve, reject) => {
        const result = {
          status: 201,
          data: stubReview,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.postMyReview(stubReview)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      //const newState = store.getState();
      //expect(newState.rv.myReviews).toBe([stubReview])
      done();
    });
  });
  it('should do edit MyReview correctly', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, user) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubReview,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.editMyReview(stubReview)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      //const newState = store.getState();
      //expect(newState.rv.myReviews).toBe([stubReview])
      done();
    });
  });
  it('should do delete MyReview correctly', (done) => {
    const spy = jest.spyOn(axios, 'delete')
      .mockImplementation((url, user) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubReview,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.deleteMyReview(stubReview.id)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      //const newState = store.getState();
      //expect(newState.rv.myReviews).toBe([stubReview])
      done();
    });
  });
});
