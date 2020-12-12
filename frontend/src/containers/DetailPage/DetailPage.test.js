import React from 'react';
import { mount } from 'enzyme';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import DetailPage from './DetailPage';
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

jest.mock('../../components/DetailPage/Keywords/Keywords', () => jest.fn((props) => (
  <div className="spyKeywords">
    Hi
  </div>
)));
jest.mock('./ReviewList/ReviewList', () => jest.fn(() => (
  <div className="spyReviewList">
    ReviewList
    <button>카카오</button>
    <button>네이버</button>
    <button>ATM</button>
  </div>
)));

const stubInitialState = {
  restaurant: {
    selectedRestaurant: {
      id: 1,
      title: '안녕베트남',
      rate: 4.78,
      menu: {
        쌀국수: '12000',
        분짜: null,
      },
      time: {
        '영업 시간': {
          일요일: '9:00-21:00',
        },
        휴무일: [],
      },
      keywords: ['맵다', '짜다', '분위기가 좋다'],
      category: ['베트남음식'],
      difference: 0.43,
      img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2Fb72e71be49f89b3751f1572c04d5ec492c097a7733c94c0c9c33a0ed286f8c90',
        'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Fcfile9.uf.tistory.com%2Fimage%2F996B6C4D5E5B2E19091112',
        'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2Fc73c9306a12dce3dff999f0203c809ca36aca60fcae62342beeffe6b110a95ea',
        'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F24a682465f75ce1c0d096177b8c2af58a481bff828f30eb3c79830de0b122db4',
        'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2Fbe19185ce33026e9d1f24bb721efd1c5a2253f9e0a8891595d3d3fc50749d31c',
      ],
    },
  },
  keyword: null,
  review: {
    otherReviews: {
      naver: [],
      kakao: [],
      atm: [],
    },
  },
  user: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<DetailPage />', () => {
  const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';
  const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC';
  let detailpage;
  let stubInitialState;
  beforeEach(() => {
    detailpage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <DetailPage match={{ params: { id: '1' }, isExact: true }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    stubInitialState = {
      restaurant: {
        selectedRestaurant: {
          id: 1,
          title: '안녕베트남',
          rate: 4.78,
          menu: {
            쌀국수: '12000',
            분짜: null,
          },
          time: {
            '영업 시간': {
              일요일: '9:00-21:00',
            },
            휴무일: ['우리우리설날'],
          },
          keywords: ['맵다', '짜다', '분위기가 좋다'],
          category: ['베트남음식'],
          difference: 0.43,
          img_url_list: ['https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2Fb72e71be49f89b3751f1572c04d5ec492c097a7733c94c0c9c33a0ed286f8c90',
            'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Fcfile9.uf.tistory.com%2Fimage%2F996B6C4D5E5B2E19091112',
            'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2Fc73c9306a12dce3dff999f0203c809ca36aca60fcae62342beeffe6b110a95ea',
            'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F24a682465f75ce1c0d096177b8c2af58a481bff828f30eb3c79830de0b122db4',
            'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2Fbe19185ce33026e9d1f24bb721efd1c5a2253f9e0a8891595d3d3fc50749d31c',
          ],
        },
      },
      keyword: null,
      review: {
        otherReviews: {
          naver: [],
          kakao: [],
          atm: [],
        },
      },
      user: null,
    };
  });
  it('should render loadingscreen', () => {
    stubInitialState.restaurant.selectedRestaurant = null;
    const testMockStore = getMockStore(stubInitialState);
    const otherdetailpage = (
      <Provider store={testMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <DetailPage match={{ params: { id: '1' }, isExact: true }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(otherdetailpage);
  });
  it('should render properly', () => {
    const component = mount(detailpage);
    const wrapper = component.find('.spySideBar');
    expect(wrapper.length).toBe(1);
    const keywordwrapper = component.find('.spyKeywords');
    expect(keywordwrapper.length).toBe(1);
    const reviewwrapper = component.find('.spyReviewList');
    expect(reviewwrapper.length).toBe(1);
    //   expect(spygetRestaurantDetail).toBeCalledTimes(1);
  });
  it('should render properly when difference is positive', () => {
    const otherdetailpage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <DetailPage match={{ params: { id: '1' }, isExact: true }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(otherdetailpage);
    const wrapper = component.find('#arrow');
    expect(wrapper.length).toBe(1);
  });
  it('should render properly when difference is negative', () => {
    stubInitialState.restaurant.selectedRestaurant.difference = -0.5;
    const testMockStore = getMockStore(stubInitialState);
    const otherdetailpage = (
      <Provider store={testMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <DetailPage match={{ params: { id: '1' }, isExact: true }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(otherdetailpage);
    const wrapper = component.find('#arrow');
    expect(wrapper.length).toBe(1);
  });
  it('should render properly when difference is 0', () => {
    const testState = { ...stubInitialState };
    testState.restaurant.selectedRestaurant.difference = 0;
    const testMockStore = getMockStore(testState);
    const otherdetailpage = (
      <Provider store={testMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <DetailPage match={{ params: { id: '1' }, isExact: true }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(otherdetailpage);
    const wrapper = component.find('.rating-unchanged');
    expect(wrapper.at(0).text()).toEqual('변동없음!');
  });
  it('should call images', () => {
    const testState = { ...stubInitialState };
    testState.restaurant.selectedRestaurant.img_url_list = [
      LOAD_FAILURE_SRC,
    ];
    const testMockStore = getMockStore(testState);
    const otherdetailpage = (
      <Provider store={testMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <DetailPage match={{ params: { id: '1' }, isExact: true }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(otherdetailpage);
    const thumbnail = component.find('.restaurant-details .thumbnail');
    const image = component.find('.restaurant-image');
    const event = {
      target: {
        src: '',
        style: {
          display: 'haha',
        },
      },
    };
    thumbnail.prop('onError').call(null, event);
    image.prop('onError').call(null, event);
  });
});
it('should show NoImage', () => {
  stubInitialState.restaurant.selectedRestaurant.img_url_list = [];
  const testMockStore = getMockStore(stubInitialState);
  const otherdetailpage = (
    <Provider store={testMockStore}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <DetailPage match={{ params: { id: '1' }, isExact: true }} />}
          />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
  const component = mount(otherdetailpage);
  const thumbnail = component.find('.restaurant-details .thumbnail');
  const event = {
    target: {
      src: '',
    },
  };
  thumbnail.prop('onError').call(null, event);
});
