import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import CreatePreferenceVector from './CreatePreferenceVector';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/userActions/userActions';

describe('<CreatePreferenceVector />', () => {
  let createPreferenceVector;
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {},
      review: {},
    });
    createPreferenceVector = (
      <Provider store={mockStore}>
        <AlertProvider template={AlertTemplate}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <CreatePreferenceVector
                    username="TEST_NAME"
                    email="TEST_EMAIL"
                    password="TEST_PW"
                  />
                )}
              />
            </Switch>
          </ConnectedRouter>
        </AlertProvider>
      </Provider>
    );
  });

  it('should call postSignUp when click confirm-button', () => {
    const spyPostSignUp = jest.spyOn(actionCreators, 'postSignUp')
      .mockImplementation((userInfo) => (dispatch) => {});
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(createPreferenceVector);
    const wrapper = component.find('CreatePreferenceVector');

    wrapper.find('#confirm-button').simulate('click');
    expect(spyPostSignUp).toHaveBeenCalledTimes(1);
    expect(spyPostSignUp).toHaveBeenCalledWith({
      username: 'TEST_NAME',
      email: 'TEST_EMAIL',
      password: 'TEST_PW',
      selectedFoods: [],
    });
    expect(spyHistoryPush).toHaveBeenCalledWith('/');
  });

  it('should toggle food', () => {
    const component = mount(createPreferenceVector);
    let wrapper = component.find('CreatePreferenceVector');
    const spyPostSignUp = jest.spyOn(actionCreators, 'postSignUp')
      .mockImplementation((userInfo) => (dispatch) => {});

    wrapper.find('.food-image-wrapper').at(0).find('img').simulate('click');
    expect(wrapper.state().selectedFoods[0]).toBe(true);
    wrapper = component.find('CreatePreferenceVector');
    wrapper.find('.food-image-wrapper').find('.check-image').simulate('click');
    expect(wrapper.state().selectedFoods[0]).toBe(false);
    wrapper = component.find('CreatePreferenceVector');
    wrapper.find('.food-image-wrapper').at(0).find('img').simulate('click');
    expect(wrapper.state().selectedFoods[0]).toBe(true);

    wrapper.find('#confirm-button').simulate('click');
    expect(spyPostSignUp).toHaveBeenCalledTimes(1);
    expect(spyPostSignUp).toHaveBeenCalledWith({
      username: 'TEST_NAME',
      email: 'TEST_EMAIL',
      password: 'TEST_PW',
      selectedFoods: ['짜장면'],
    });
  });
});
