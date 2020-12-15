import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import * as actionCreators from '../../store/actions/restaurantActions/restaurauntActions';
import getMockStore from '../../test-utils/mocks';
import { history } from '../../store/store';
import RestaurantSummary from '../../components/MainPage/RestaurantSummary/RestaurantSummary';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import './MainPage.css';

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

jest.mock('../../components/LoadingScreen/LoadingScreen', () => jest.fn(() => (
  <div className="spyLoading">
    HI
  </div>
)));
jest.mock('../../components/MainPage/RestaurantSummary/RestaurantSummary', () => jest.fn((props) => (
  <div className="spySummary">
    {props.title}
    {props.id}
    {props.rate}
    {props.img_url_list}
  </div>
)));

const stubInitialState = {
  restaurant: {
    restaurantlist: [
      {
        id: 1,
        title: '안녕베트남',
        rate: 4.78,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: { 맵다: 10, 짜다: 11, '분위기가 좋다': 10 },
        preferenceVector: {
          느끼하다: 4.8,
          분위기: 4.5,
          웨이팅: 4.4,
        },
        category: '베트남음식',
        difference: 0.43,
      },
      {
        id: 3,
        title: '유동커피',
        rate: 4.65,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: ['맵다', '짜다', '분위기가 좋다'],
        category: '카페',
        difference: 0.43,
        preferenceVector: {
          아늑한: 5.0,
          푸짐한: 4.8,
          달콤한: 3.6,
        },
      },
      {
        id: 11,
        title: '안녕베트남',
        rate: 4.78,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: { 맵다: 10, 짜다: 11, '분위기가 좋다': 10 },
        preferenceVector: {
          느끼하다: 4.8,
          분위기: 4.5,
          웨이팅: 4.4,
        },
        category: '베트남음식',
        difference: 0.43,
      }, {
        id: 111,
        title: '안녕베트남',
        rate: 4.78,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: { 맵다: 10, 짜다: 11, '분위기가 좋다': 10 },
        preferenceVector: {
          느끼하다: 4.8,
          분위기: 4.5,
          웨이팅: 4.4,
        },
        category: '베트남음식',
        difference: 0.43,
      },
      {
        id: 1111,
        title: '안녕베트남',
        rate: 4.78,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: { 맵다: 10, 짜다: 11, '분위기가 좋다': 10 },
        preferenceVector: {
          느끼하다: 4.8,
          분위기: 4.5,
          웨이팅: 4.4,
        },
        category: '베트남음식',
        difference: 0.43,
      },
      {
        id: 111111,
        title: '안녕베트남',
        rate: 4.78,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: { 맵다: 10, 짜다: 11, '분위기가 좋다': 10 },
        preferenceVector: {
          느끼하다: 4.8,
          분위기: 4.5,
          웨이팅: 4.4,
        },
        category: '베트남음식',
        difference: 0.43,
      },
      {
        id: 14,
        title: '안녕베트남',
        rate: 4.78,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: { 맵다: 10, 짜다: 11, '분위기가 좋다': 10 },
        preferenceVector: {
          느끼하다: 4.8,
          분위기: 4.5,
          웨이팅: 4.4,
        },
        category: '베트남음식',
        difference: 0.43,
      },
      {
        id: 15,
        title: '안녕베트남',
        rate: 4.78,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: { 맵다: 10, 짜다: 11, '분위기가 좋다': 10 },
        preferenceVector: {
          느끼하다: 4.8,
          분위기: 4.5,
          웨이팅: 4.4,
        },
        category: '베트남음식',
        difference: 0.43,
      },
      {
        id: 16,
        title: '안녕베트남',
        rate: 4.78,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: { 맵다: 10, 짜다: 11, '분위기가 좋다': 10 },
        preferenceVector: {
          느끼하다: 4.8,
          분위기: 4.5,
          웨이팅: 4.4,
        },
        category: '베트남음식',
        difference: 0.43,
      },
      {
        id: 17,
        title: '안녕베트남',
        rate: 4.78,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: { 맵다: 10, 짜다: 11, '분위기가 좋다': 10 },
        preferenceVector: {
          느끼하다: 4.8,
          분위기: 4.5,
          웨이팅: 4.4,
        },
        category: '베트남음식',
        difference: 0.43,
      },
      {
        id: 18,
        title: '안녕베트남',
        rate: 4.78,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: { 맵다: 10, 짜다: 11, '분위기가 좋다': 10 },
        preferenceVector: {
          느끼하다: 4.8,
          분위기: 4.5,
          웨이팅: 4.4,
        },
        category: '베트남음식',
        difference: 0.43,
      },
      {
        id: 19,
        title: '안녕베트남',
        rate: 4.78,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: { 맵다: 10, 짜다: 11, '분위기가 좋다': 10 },
        preferenceVector: {
          느끼하다: 4.8,
          분위기: 4.5,
          웨이팅: 4.4,
        },
        category: '베트남음식',
        difference: 0.43,
      },
      {
        id: 113,
        title: '안녕베트남',
        rate: 4.78,
        img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'],
        menu: ['짜장면 6000원', '탕수육 2000원'],
        time: '9;00-12:00',
        keywords: { 맵다: 10, 짜다: 11, '분위기가 좋다': 10 },
        preferenceVector: {
          느끼하다: 4.8,
          분위기: 4.5,
          웨이팅: 4.4,
        },
        category: '베트남음식',
        difference: 0.43,
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
  let mainpage;
  let spyGetRestaurantList;
  let spyScrollTo;
  let mockFn;
  beforeEach(() => {
    mainpage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <MainPage match={{ params: { name: '1' }, isExact: true }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetRestaurantList = jest.spyOn(actionCreators, 'getRestaurantList')
      .mockImplementation((searchWord) => (dispatch) => {});

    spyScrollTo = jest.spyOn(window, 'scrollTo')
      .mockImplementation((x, y) => {});

    // spyGetFoodCategory = jest.spyOn(actionCreators, 'getFoodCategory')
    //   .mockImplemetation(() => {return dispatch => {}; });
  });
  it('should render main page properly', () => {
    const component = mount(mainpage);
    expect(spyGetRestaurantList).toBeCalledTimes(1);
    const wrapper = component.find('.spySummary');
    expect(component.find('.spyLoading').length).toBe(0);
    expect(wrapper.length).toBe(10);
    expect(spyGetRestaurantList).toBeCalledTimes(1);
    const button = component.find('#more-button');
    button.simulate('click');
  });
  it('should click help properly', () => {
    const component = mount(mainpage);
    const wrapper = component.find('.header-help');
    expect(component.find('.spyLoading').length).toBe(0);
    expect(component.find('.restaurantList').length).toBe(1);
    expect(component.find('.header-help-content').length).toBe(1);
    wrapper.simulate('click');
  });
  it('should render searched restaurant', () => {
    const mainPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <MainPage match={{ params: { name: '안' }, isExact: true }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(mainPage);
    expect(component.find('.restaurantList').length).toBe(1);
  });
  it('should render not found page properly', () => {
    const InitialState = {
      restaurant: {
        restaurantlist: [

        ],
        selectedRestaurant: null,
      },
      user: null,
      keyword: null,
      review: null,
    };
    const stubMockStore = getMockStore(InitialState);
    const stubMainPage = (
      <Provider store={stubMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <MainPage match={{ params: { name: 'elel' }, isExact: true }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(stubMainPage);
    expect(component.find('.no-result').length).toBe(1);
  });
});
