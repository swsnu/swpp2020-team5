import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ReviewList from './ReviewList';
import * as reviewActionCreator from '../../../store/actions/reviewActions/reviewActions';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import OtherReview from '../../../components/DetailPage/OtherReview/OtherReview';

const stubInitialState = {
  user: {
    id: 0,
    username: '',
    preferenceVector: null,
    foodCategory: null,
    searchLocation: null,
    selectedUser: { name: 'TEST_USER' },
  },
  keyword: null,
  restaurant: { selectedRestaurant: { id: 1, title: 'TEST' } },
  review: {
    otherReviews: {
      naver: [
        {
          content: '맛있으나 불친절하다.',
          rating: 2.5,
          createTime: new Date(),
          authorName: '사용자1',
        },
        {
          content: '불친절해서 좋아요',
          rating: 1.5,
          createTime: new Date(),
          authorName: '사용자3',
        },
        {
          content: '너무 매웠던 것 빼고는 그런대로 만족합니다.',
          rating: 3.5,
          createTime: new Date(),
          authorName: '사용자4',
        },
      ],
      kakao: [
        {
          content: '최고인듯',
          rating: 5.0,
          createTime: new Date(),
          authorName: '사용자2',
        },
      ],
      atm: [
        {
          content: '최고인듯',
          rating: 5.0,
          createTime: new Date(),
          authorName: '사용자2',
        },
        {
          content: '불친절해서 좋아요',
          rating: 1.5,
          createTime: new Date(),
          authorName: '사용자3',
        },
      ],
    },
  },
};

const mockStore = getMockStore(stubInitialState);

describe('<ReviewList /', () => {
  let reviewList;
  let spyGetReviews;

  beforeEach(() => {
    reviewList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReviewList />
        </ConnectedRouter>
      </Provider>
    );

    spyGetReviews = jest.spyOn(reviewActionCreator, 'getOtherReviews')
      .mockImplementation(() => (dispatch) => {});
  });

  afterEach(() => { jest.clearAllMocks(); });

  it('should render without errors', () => {
    const component = mount(reviewList);
    const wrapper = component.find('.ReviewList');

    expect(wrapper.length).toBe(1);
  });

  it('should call getReviews', () => {
    const component = mount(reviewList);
    expect(spyGetReviews).toBeCalledTimes(1);
  });

  it('should handle Other Reviews', () => {
    const component = mount(reviewList);
    const wrapper = component.find(OtherReview);
    expect(wrapper.length).toBe(3);
  });
});
