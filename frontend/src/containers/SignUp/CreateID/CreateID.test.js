import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mocks';
import CreateID from './CreateID';

const stubInitialState = {
  keyword: null,
  review: null,
  user: null,
  restaurant: null,
};

const mockStore = getMockStore(stubInitialState);
const mockChangeStage = jest.fn();

describe('<CreateID/>', () => {
  let createid;
  beforeEach(() => {
    createid = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <CreateID onChangeStageHandler={mockChangeStage} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
  it('should render properly', () => {
    const component = mount(createid);
    const wrapper = component.find('.createID');
    expect(wrapper.length).toBe(1);
    const verify = component.find('#verified');
    expect(verify.text()).toEqual('Password not verified');
  });
  it('should change state properly', () => {
    const mockusername = 'user';
    const mockemail = 'email';
    const mockpassword = 'a';
    const mockverify = 'a';
    const component = mount(createid);
    const userwrapper = component.find('#username-input');
    userwrapper.simulate('change', { target: { value: mockusername } });
    let instance = component.find(CreateID.WrappedComponent).instance();
    expect(instance.state.userInfo.username).toEqual(mockusername);
    const emailwrapper = component.find('#email-input');
    emailwrapper.simulate('change', { target: { value: mockemail } });
    instance = component.find(CreateID.WrappedComponent).instance();
    expect(instance.state.userInfo.email).toEqual(mockemail);
    const passwordwrapper = component.find('#password-input');
    passwordwrapper.simulate('change', { target: { value: mockpassword } });
    instance = component.find(CreateID.WrappedComponent).instance();
    expect(instance.state.userInfo.password).toEqual(mockpassword);
    expect(component.find('#verified').text()).toEqual('Password not verified');
    const verifywrapper = component.find('#verify-password-input');
    verifywrapper.simulate('change', { target: { value: mockverify } });
    instance = component.find(CreateID.WrappedComponent).instance();
    expect(instance.state.verifyPassword).toEqual(mockverify);
    expect(component.find('#verified').text()).toEqual('Ok');

    const clickwrapper = component.find('#confirm-button');
    clickwrapper.simulate('click');
    instance = component.find(CreateID.WrappedComponent).instance();
    expect(instance.state.mode).toEqual('Preference');
    expect(mockChangeStage).toBeCalledTimes(1);
  });
});
