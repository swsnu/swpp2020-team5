import React from 'react';
import App from './App';
import { mount, shallow } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { history } from './store/store';
import { Provider } from 'react-redux';
import { getMockStore } from './test-utils/mocks';

jest.mock('./containers/SignIn/SignIn', () => {
  return jest.fn(props => {
    return (
      <div className='spySignIn'></div>
    )
  })
});

jest.mock('./containers/SignUp/SignUp', () => {
  return jest.fn(props => {
    return (
      <div className='spySignUp'></div>
    )
  })
});

jest.mock('./containers/MainPage/MainPage', () => {
  return jest.fn(props => {
    return (
      <div className='spyMainPage'></div>
    )
  })
});

jest.mock('./containers/DetailPage/DetailPage', () => {
  return jest.fn(props => {
    return (
      <div className='spyDetailPage'></div>
    )
  })
});

describe('App',() => {
  afterEach(() => { jest.clearAllMocks(); })
  it('should create SignIn at /', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {},
      review: {}
    });
    history.push('/');
    let app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('.spySignIn').length).toBe(1)
  });

  it('should create SignIn at /sing-in', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {},
      review: {}
    });
    history.push('/sign-in');
    let app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('.spySignIn').length).toBe(1)
  });

  it('should create SignUp at /sign-up', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {},
      review: {}
    });
    history.push('/sign-up');
    let app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('.spySignUp').length).toBe(1)
  });

  it('should create MainPage at /main/:name', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {},
      review: {}
    });
    history.push('/main/hi');
    let app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('.spyMainPage').length).toBe(1)
  });

  it('should create DetailPage at /detail/:id', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {},
      review: {}
    });
    history.push('/detail/1');
    let app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('.spyDetailPage').length).toBe(1)
  });

  it('should create h1 at /not-found', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {},
      review: {}
    });
    history.push('/not-found');
    let app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('h1').length).toBe(1)
  });

});

