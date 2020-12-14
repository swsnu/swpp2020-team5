import React, { Component } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { withAlert } from 'react-alert';

import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../../../store/store';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import getMockStore from '../../../test-utils/mocks';
import CreateID from './CreateID';
import * as actionCreators from '../../../store/actions/userActions/userActions';

const stubInitialState = {
  keyword: null,
  review: null,
  user: {
    preferenceVector: {},
    foodCategory: {},
    searchLocation: {
      address: {
        address_name: '서울 관악구',
        b_code: '1162000000',
        h_code: '1162000000',
        main_address_no: '',
        mountain_yn: 'N',
        region_1depth_name: '서울',
        region_2depth_name: '관악구',
        region_3depth_h_name: '',
        region_3depth_name: '',
        sub_address_no: '',
        x: '126.951561853868',
        y: '37.4783683761333',
      },
      address_name: '서울 관악구',
      address_type: 'REGION',
      road_address: null,
      x: '126.951561853868',
      y: '37.4783683761333',
    },
    checkUserStatus: 'NotYet',
    isGetUserCalled: false,
  },
  restaurant: null,
};

const mockStore = getMockStore(stubInitialState);
const mockChangeStage = jest.fn();

describe('<CreateID/>', () => {
  let createid;
  let spyResetCheckUser;
  beforeEach(() => {
    createid = (
      <Provider store={mockStore}>
        <AlertProvider template={AlertTemplate}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <CreateID onChangeStageHandler={mockChangeStage} />}
            />
          </Switch>
        </ConnectedRouter>
        </AlertProvider>
      </Provider>
    );
    spyResetCheckUser = jest.spyOn(actionCreators, 'resetCheckUser')
      .mockImplementation(() => (dispatch) => {});
  });
  it('should render properly', () => {
    const component = mount(createid);
    const wrapper = component.find('.createID');
    expect(wrapper.length).toBe(1);
    expect(spyResetCheckUser).toBeCalledTimes(1);
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
    emailwrapper.simulate('change', { target: { value: 'ddd@ddd' } });
    const passwordwrapper = component.find('#password-input');
    passwordwrapper.simulate('change', { target: { value: mockpassword } });
    instance = component.find(CreateID.WrappedComponent).instance();
    expect(instance.state.userInfo.password).toEqual(mockpassword);
    const verifywrapper = component.find('#verify-password-input');
    verifywrapper.simulate('change', { target: { value: mockverify } });
    instance = component.find(CreateID.WrappedComponent).instance();
    expect(instance.state.verifyPassword).toEqual(mockverify);
    const clickwrapper = component.find('#sign-up-button');
    clickwrapper.simulate('click');

    const spyCheckUser = jest.spyOn(actionCreators, 'checkUser')
      .mockImplementation((email, password) => (dispatch) => {});
    instance = component.find(CreateID.WrappedComponent).instance();
    expect(instance.state.shouldCheck).toEqual(true);
    expect(spyCheckUser).toBeCalledTimes(0);
  });
  it('should check email duplicated', () => {
    const initialState = {
      keyword: null,
      review: null,
      user: 'Exist',
      restaurant: null,
    };
    const stubMockStore = getMockStore(initialState);
    const stubCreateId = (
      <Provider store={stubMockStore}>
        <AlertProvider template={AlertTemplate}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <CreateID onChangeStageHandler={mockChangeStage} />}
            />
          </Switch>
        </ConnectedRouter>
        </AlertProvider>
      </Provider>
    );
    const component = mount(stubCreateId);
    let changeHandler = component.find('#username-input');
    changeHandler.simulate('change', { target: { value: 'dd' } });
    changeHandler = component.find('#email-input');
    changeHandler.simulate('change', { target: { value: 'aaa@aaa' } });
    changeHandler = component.find('#password-input');
    changeHandler.simulate('change', { target: { value: '123' } });
    changeHandler = component.find('#verify-password-input');
    changeHandler.simulate('change', { target: { value: '123' } });
    changeHandler = component.find('#sign-up-button');
    changeHandler.simulate('click');
    const instance = component.find(CreateID.WrappedComponent).instance();
    expect(instance.state.shouldCheck).toEqual(true);
    changeHandler.simulate('click');
    changeHandler = component.find('#email-input');
    changeHandler.simulate('change', { target: { value: 'aaa@aaa' } });
  });
});
