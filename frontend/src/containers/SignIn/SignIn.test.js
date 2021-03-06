import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import SignIn from './SignIn';
import getMockStore from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as userActionCreators from '../../store/actions/userActions/userActions';

const stubInitialState = {
  user: {
    id: 0,
    username: '',
    preferenceVector: null,
    foodCategory: null,
    searchLocation: null,
  },
  keyword: null,
  restaurant: null,
  review: null,
};

const mockGeolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementationOnce((success, error) => {
      Promise.resolve(success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      }));
      Promise.resolve(error({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      }));
    }),
  watchPosition: jest.fn(),
};

const mockStore = getMockStore(stubInitialState);
global.navigator.geolocation = mockGeolocation;

describe('<SignIn />', () => {
  let signIn;
  beforeEach(() => {
    signIn = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <SignIn />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should set state properly on email input', () => {
    const email = 'yeet@naver.com';
    const component = mount(signIn);
    const wrapper = component.find('#email-input');
    wrapper.simulate('change', { target: { value: email } });
    const newSignInInstance = component.find(SignIn.WrappedComponent).instance();
    expect(newSignInInstance.state.email).toEqual(email);
    expect(newSignInInstance.state.password).toEqual('');
  });

  it('should set state properly on password input', () => {
    const password = 'yeet1234';
    const component = mount(signIn);
    const wrapper = component.find('#password-input');
    wrapper.simulate('change', { target: { value: password } });
    const newSignInInstance = component.find(SignIn.WrappedComponent).instance();
    expect(newSignInInstance.state.email).toEqual('');
    expect(newSignInInstance.state.password).toEqual(password);
  });
});
