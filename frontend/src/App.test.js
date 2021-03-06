import React from 'react';
import { mount, shallow } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { history } from './store/store';
import App from './App';
import getMockStore from './test-utils/mocks';
import * as actionCreators from './store/actions/userActions/userActions';

jest.mock('./containers/SignIn/SignIn', () => jest.fn((props) => (
  <div className="spySignIn" />
)));

jest.mock('./containers/SignUp/SignUp', () => jest.fn((props) => (
  <div className="spySignUp" />
)));

jest.mock('./containers/MainPage/MainPage', () => jest.fn((props) => (
  <div className="spyMainPage" />
)));

jest.mock('./containers/DetailPage/DetailPage', () => jest.fn((props) => (
  <div className="spyDetailPage" />
)));

describe('App', () => {
  afterEach(() => { jest.clearAllMocks(); });
  it('should call onGetUser when isGetUserCalled is false', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {
        selectedUser: null,
        isGetUserCalled: false,
      },
      review: {},
    });
    history.location.pathname = '/';
    const spyGetUser = jest.spyOn(actionCreators, 'getUser')
      .mockImplementation(() => (dispatch) => {});
    const app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(spyGetUser).toHaveBeenCalledTimes(1);
  });
  it('should create SignIn at /', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {
        selectedUser: null,
        isGetUserCalled: true,
      },
      review: {},
    });
    history.location.pathname = '/';
    const app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('.spySignIn').length).toBe(1);
  });

  it('should create SignIn at /sign-in', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {
        selectedUser: null,
        isGetUserCalled: true,
      },
      review: {},
    });
    history.location.pathname = '/sign-in/';
    const app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('.spySignIn').length).toBe(1);
  });

  it('should create SignUp at /sign-up', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {
        selectedUser: null,
        isGetUserCalled: true,
      },
      review: {},
    });
    history.location.pathname = '/sign-up/';
    const app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('.spySignUp').length).toBe(1);
  });

  it('should create MainPage at /main/:name', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {
        selectedUser: {},
        isGetUserCalled: true,
      },
      review: {},
    });
    history.location.pathname = '/main/hi_vietnam/';
    const app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('.spyMainPage').length).toBe(1);
  });

  it('should create DetailPage at /detail/:id', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {
        selectedUser: {},
        isGetUserCalled: true,
      },
      review: {},
    });
    history.location.pathname = '/detail/1/';
    const app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('.spyDetailPage').length).toBe(1);
  });

  it('should create h1 at /not-found', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {
        selectedUser: {},
        isGetUserCalled: true,
      },
      review: {},
    });
    history.location.pathname = '/not-found/';
    const app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('h1').length).toBe(1);
  });
});
