import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PreferenceVectorTab from './PreferenceVectorTab';
import * as userActionCreator from '../../../store/actions/userActions/userActions';
import * as reviewActionCreator from '../../../store/actions/reviewActions/reviewActions';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

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

describe('<PreferenceVectorTab /', () => {
  let preVecTab;
  let spyGetUser; let
    spyPutPreferenceVector;

  beforeEach(() => {
    preVecTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <PreferenceVectorTab />
        </ConnectedRouter>
      </Provider>
    );

    spyGetUser = jest.spyOn(userActionCreator, 'getUser')
      .mockImplementation(() => (dispatch) => {});

    spyPutPreferenceVector = jest.spyOn(userActionCreator, 'putPreferenceVector')
      .mockImplementation(() => (dispatch) => {});
  });

  afterEach(() => { jest.clearAllMocks(); });

  it('should render without errors', () => {
    const component = mount(preVecTab);
    const wrapper = component.find('.PreferenceVectorTab');

    expect(wrapper.length).toBe(1);
  });

  it('should handle confirm button', () => {
    const component = mount(preVecTab);
    const wrapper = component.find('#preference-vector-button');
    wrapper.simulate('click');
    expect(spyPutPreferenceVector).toBeCalledTimes(1);
  });

  it('should handle changing factor', () => {
    const component = mount(preVecTab);
    const wrapper = component.find('#factor_one');
    wrapper.at(0).prop('onChangeCommitted')({ target: { id: 'factor_one' } }, 20);

    const preVecInstance = component.find(PreferenceVectorTab.WrappedComponent).instance();
    expect(preVecInstance.state.currentPreferenceVector.factor_one).toBe(20);
  });
});
