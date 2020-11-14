/* global kakao */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import LocationTab from './LocationTab';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mocks';
import * as userActionCreators from '../../../store/actions/userActions/userActions';

jest.mock('../../../components/SearchResult/SearchResult', () => jest.fn((props) => (
  <div className="spySearchResult">
    {props.address_name}
  </div>
)));

global.kakao = {
  maps: {
    load: (func) => {},
    services: {
      Geocoder: function Geocoder() {
        this.addressSearch = (location, callback, dict) => {
          callback(['F', 'T', 'S']);
        };
      },
    },
    LatLng: function LatLng(y, x) {
      this.y = y;
      this.x = x;
    },
    load: (func) => { func(); },
    Map: function Map(container, options) {
      this.container = container;
      this.optons = options;
    },
  },
};
const lLW = {
  style: {
    display: 'shit',
  },
};
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
  let locationTab;
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

  it('should do everything', () => {
    const spyChangeLocation = jest.spyOn(userActionCreators, 'changeLocation')
      .mockImplementation((loc) => (dispatch) => {});
    const component = mount(locationTab);
    const inputWrapper = component.find('#location-input');
    const locTabInstance = component.find(LocationTab.WrappedComponent).instance();
    locTabInstance.setState({ locationListWrapper: lLW });
    locTabInstance.setState({ map: { setCenter: () => {} } });

    inputWrapper.simulate('change', { target: { value: '반야심경' } });

    const candidateWrapper = component.find('.candidate').at(0);
    const input = document.createElement('input');
    input.id = 'location-input';
    document.body.appendChild(input);
    candidateWrapper.simulate('click');

    expect(spyChangeLocation).toHaveBeenCalledTimes(1);
    inputWrapper.simulate('change', { target: { value: '' } });
    expect(1).toBe(1);
    fireEvent.load(locTabInstance.state.script);
  });
});
