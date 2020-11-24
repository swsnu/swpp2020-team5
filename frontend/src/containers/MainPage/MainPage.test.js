import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import * as actionCreators from '../../store/actions/index';
import getMockStore from '../../test-utils/mocks';
import { history } from '../../store/store';

jest.mock('../SideBar/SideBar', () => jest.fn((props) => (
  <div className="spySideBar">
    SideBar
    <button>검색</button>
    <input type="text" />
    <div className="myinfo">
      나의정보
    </div>
    <div className="preferncevector">
      나의취향
    </div>
    <div className="category">
      카테고리
    </div>
    <div className="location">
      지도
    </div>
  </div>
)));

jest.mock('../../components/MainPage/RestaurantSummary/RestaurantSummary', () => jest.fn((props) => (
  <div className="spySummary">
    {props.title}
    {props.id}
    {props.rate}
    <img src={props.img_url} alt="img" />

  </div>
)));

const stubInitialState = {
  restaurant: {
    restaurantlist: [

      {
        id: 1,
        title: '안녕베트남',
        rate: 4.78,
        // img_url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tangsuyuk_%28Korean_Chinese_sweet_and_sour_pork%29.jpg?download',
        img_url: 'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0',
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
        img_url: 'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0',
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
    ],
    selectedRestaurant: null,
  },
  user: {
    foodCategory: {
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
    },
  },
  keyword: null,
  review: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<MainPage />', () => {
  let spyGetRestaurantList; let spyGetFoodCategory; let
    mainpage;
  beforeEach(() => {
    mainpage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <MainPage />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    // spyGetRestaurantList =  jest.spyOn(actionCreators, 'getRestaurantList')
    //   .mockImplementation(() => {return dispatch => {}; });
    // spyGetFoodCategory = jest.spyOn(actionCreators, 'getFoodCategory')
    //   .mockImplemetation(() => {return dispatch => {}; });
  });
  it('should render properly', () => {
    const component = mount(mainpage);
    const wrapper = component.find('.spySummary');
    expect(wrapper.length).toBe(1);
    // expect(spyGetFoodCategory).toBeCalledTimes(1);
    // expect(spyGetRestaurantList).toBeCalledTimes(1);
  });
});
