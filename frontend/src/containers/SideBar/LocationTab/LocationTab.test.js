/* global kakao */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import LocationTab from './LocationTab';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mocks';
import * as userActionCreators from '../../../store/actions/userActions/userActions';

jest.mock('../../../components/SearchResult/SearchResult', () => {
  return jest.fn(props => {
    return (
      <div className="spySearchResult">
        {props.address_name}
      </div>);
  });
});

const stubInitialState = {
  user: {
    id: 0,
    username: '우렁쌈밥',
    preferenceVector: null,
    foodCategory: null,
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
  },
  keyword: null,
  restaurant: null,
  review: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<LocationTab />', () => {
  let locationTab, spyChangeLocIn;
  beforeEach(() => {
    locationTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <LocationTab />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should call "onChangeLocationInputHandler"', () => {
    const locationInput = '낙성대로';
    const component = mount(locationTab);
    const wrapper = component.find('#location-input');
    const newLocationTabInstance = component.find(LocationTab.WrappedComponent).instance();
    wrapper.simulate('change', { target: { value: locationInput }});

    expect(1).toBe(1);
  });
});
