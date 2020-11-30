import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import LocationTab from './LocationTab';
import { history } from '../../../store/store';
import getMockStore from '../../../test-utils/mocks';
import * as userActionCreators from '../../../store/actions/userActions/userActions';

jest.mock('../../../components/SideBar/SearchResult/SearchResult', () => jest.fn((props) => (
  <div className="spySearchResult">
    {props.address_name}
  </div>
)));

global.kakao = {
  maps: {
    services: {
      Geocoder: function Geocoder() {
        this.addressSearch = (location, callback) => {
          callback(['F', 'T', 'S', location]);
        };
      },
    },
    LatLng: function LatLng(y, x) {
      this.y = y;
      this.x = x;
    },
    load: (func) => func(),
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
    searchLocation: [],
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
    //
    // DISCLAIMER: This test is a total mess: it has no usability whatsoever.
    //             Do not attempt to understand the fucntioalities of the LocationTab
    //             by this unittest.
    //
    const spyChangeLocation = jest.spyOn(userActionCreators, 'editSearchLocation')
      .mockImplementation(() => () => {});
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
    locTabInstance.setState({ script: null });
    inputWrapper.simulate('change', { target: { value: '반야심경' } });
  });
});
