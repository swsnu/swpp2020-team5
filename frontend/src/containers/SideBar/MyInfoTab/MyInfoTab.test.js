import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import MyInfoTab from './MyInfoTab';
import * as userActionCreator from '../../../store/actions/userActions/userActions';
import * as reviewActionCreator from '../../../store/actions/reviewActions/reviewActions';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

jest.mock('../../../components/SideBar/MyReview/MyReview', () => jest.fn((props) => (
  <div className="MyReview">
    <p>{props.restaurantID}</p>
  </div>
)));

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
    myReviews: [
      {
        id: 10,
        content: '국물 맛이 좋다',
        rating: 5,
        modifiedTime: new Date(),
      },
      {
        id: 12,
        content: '그냥 맛이 좋다',
        rating: 5,
        modifiedTime: new Date(),
      },
    ],
  },
};

const mockStore = getMockStore(stubInitialState);

jest.mock

describe('<MyInfoTab /', () => {
  let myInfoTabOnMainPage; let
    myInfoTabOnDetailPage;
  let spyGetUser; let spyGetSignOut; let spyGetReviews; let
    spyPostReview;

  beforeEach(() => {
    myInfoTabOnMainPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <MyInfoTab restaurantID={-1} />
        </ConnectedRouter>
      </Provider>
    );

    myInfoTabOnDetailPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <MyInfoTab restaurantID={1} />
        </ConnectedRouter>
      </Provider>
    );

    spyGetUser = jest.spyOn(userActionCreator, 'getUser')
      .mockImplementation(() => (dispatch) => {});

    // TODO SignOut should be implemented!!!
    // spyGetSignOut = jest.spyOn(userActionCreator, 'getSignOut')
    //    .mockImplementation(() => {return dispatch => {};});
    spyGetReviews = jest.spyOn(reviewActionCreator, 'getReviews')
      .mockImplementation(() => (dispatch) => {});
    spyPostReview = jest.spyOn(reviewActionCreator, 'postReview')
      .mockImplementation(() => (dispatch) => {});
  });

  afterEach(() => { jest.clearAllMocks(); });

  it('should render without errors', () => {
    const component = mount(myInfoTabOnMainPage);
    const wrapper = component.find('.MyInfoTab');

    expect(wrapper.length).toBe(1);
  });

  it('should render only welcome component when page is  main page', () => {
    const component = mount(myInfoTabOnMainPage);
    const wrapper = component.find('.on-main-page');
    const upperBar = component.find('.upper-bar');
    const wrapperToBeFalse = component.find('on-detail-page');

    expect(wrapper.length).toBe(1);
    expect(upperBar.length).toBe(1);
    expect(wrapperToBeFalse.length).toBe(0);
  });

  it('should render my review and review input and rating component when page is detail page', () => {
    const component = mount(myInfoTabOnDetailPage);
    const wrapper = component.find('.on-detail-page');
    const upperBar = component.find('.upper-bar');
    const wrapperToBeFalse = component.find('.on-main-page');
    const myReview = component.find('.Review');
    const reviewInput = component.find('#review-input');
    const reviewConfirmButton = component.find('#review-confirm');
    const rateStar = component.find('#rate-star');

    // check the render of each component
    expect(wrapper.length).toBe(1);
    expect(upperBar.length).toBe(1);
    expect(wrapperToBeFalse.length).toBe(0);

    expect(myReview.length).toBe(2);
    // this should be fixed. why there are three of this component?
    expect(reviewInput.length).toBe(1);
    expect(reviewConfirmButton.length).toBe(1);
    expect(rateStar.length).toBe(1);

    // review input
    reviewInput.simulate('change', { target: { value: 'test' } });
    const MyInfoInstance = component.find(MyInfoTab.WrappedComponent).instance();
    expect(MyInfoInstance.state.content).toBe('test');

    // review confirm
    reviewConfirmButton.simulate('click');
    expect(spyPostReview).toBeCalledTimes(1);
  });

  it('should handle signout', () => {
    const component = mount(myInfoTabOnMainPage);
  });

  it('should handle rating', () => {

  });
});
