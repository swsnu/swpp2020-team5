import React from 'react';
import { mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import SideBar from './SideBar';
import getMockStore from '../../test-utils/mocks';
import * as actionCreators from '../../store/actions/userActions/userActions';

jest.mock('./MyInfoTab/MyInfoTab', () => jest.fn((props) => (
  <div className="spyMyInfoTab">
    <p>{props.restaurantID}</p>
  </div>
)));

jest.mock('../../components/SideBar/LocationTab/LocationTab', () => jest.fn((props) => (
  <div className="spyLocationTab">
    <button id="spy-button" onClick={() => { props.onChangeLocation('TEST'); }} />
  </div>
)));

jest.mock('../../components/SideBar/FoodCategoryTab/FoodCategoryTab', () => jest.fn((props) => (
  <div className="spyFoodCategoryTab">
    <button id="spy-button" onClick={() => props.postClickFoodCategoryHandler('한식')} />
    <button id="spy-button-for-all" onClick={() => props.postClickFoodCategoryHandler('total')} />
  </div>
)));

jest.mock('../../components/SideBar/PreferenceVectorTab/PreferenceVectorTab', () => jest.fn((props) => (
  <div className="spyPreferenceVectorTab">
    <button id="spy-button" onClick={() => props.onChangeFactor('매운', { target: { value: 1 } })} />
  </div>
)));

describe('<SideBar />', () => {
  let sideBar;
  let makeMockStore;
  let makeSideBar;
  beforeEach(() => {
    makeMockStore = (tabMode) => 
      getMockStore({
        keyword: {},
        restaurant: {},
        user: {
          searchLocation: {
            address_name: '서울 관악구',
          },
          foodCategory: {
            한식: false,
          },
          preferenceVector: {
            매운: 3,
          },
          tabMode: tabMode,
        },
        review: {},
      });
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {
        searchLocation: {
          address_name: '서울 관악구',
        },
        foodCategory: {
          한식: false,
        },
        preferenceVector: {
          매운: 3,
        },
        tabMode: 'MyInfo',
      },
      review: {},
    });
    makeSideBar = mockStore => (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <SideBar />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    sideBar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <SideBar />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => { jest.clearAllMocks(); });

  it('should render SideBar ', () => {
    const component = mount(sideBar);
    const wrapper = component.find('.SideBar');
    expect(wrapper.length).toBe(1);
  });

  it('should render tabs when clicking tab-image-button', () => {
    let component = mount(sideBar);

    let spyEditCurrentTab = jest.spyOn(actionCreators, 'editCurrentTab')
      .mockImplementation((dispatch) => () => {});
    let wrapper = component.find('SideBar');
    expect(wrapper.find('.spyMyInfoTab').length).toBe(1);
    expect(wrapper.find('.spyLocationTab').length).toBe(0);
    expect(wrapper.find('.spyFoodCategoryTab').length).toBe(0);
    expect(wrapper.find('.spyPreferenceVectorTab').length).toBe(0);
    expect(wrapper.find('.tab-button-image-line .tab-button').length).toBe(4);

    wrapper.find('.tab-button').at(1).simulate('click');
    expect(spyEditCurrentTab).toHaveBeenCalledWith('Location');
    wrapper.find('.tab-button').at(2).simulate('click');
    expect(spyEditCurrentTab).toHaveBeenCalledWith('FoodCategory');
    wrapper.find('.tab-button').at(3).simulate('click');
    expect(spyEditCurrentTab).toHaveBeenCalledWith('PreferenceVector');
    wrapper.find('.tab-button').at(0).simulate('click');
    expect(spyEditCurrentTab).toHaveBeenCalledWith('MyInfo');

    component = mount(makeSideBar(makeMockStore('Location')));
    wrapper = component.find('SideBar');
    expect(wrapper.find('.spyMyInfoTab').length).toBe(0);
    expect(wrapper.find('.spyLocationTab').length).toBe(1);
    expect(wrapper.find('.spyFoodCategoryTab').length).toBe(0);
    expect(wrapper.find('.spyPreferenceVectorTab').length).toBe(0);

    component = mount(makeSideBar(makeMockStore('FoodCategory')));
    wrapper = component.find('SideBar');
    expect(wrapper.find('.spyMyInfoTab').length).toBe(0);
    expect(wrapper.find('.spyLocationTab').length).toBe(0);
    expect(wrapper.find('.spyFoodCategoryTab').length).toBe(1);
    expect(wrapper.find('.spyPreferenceVectorTab').length).toBe(0);

    component = mount(makeSideBar(makeMockStore('PreferenceVector')));
    wrapper = component.find('SideBar');
    expect(wrapper.find('.spyMyInfoTab').length).toBe(0);
    expect(wrapper.find('.spyLocationTab').length).toBe(0);
    expect(wrapper.find('.spyFoodCategoryTab').length).toBe(0);
    expect(wrapper.find('.spyPreferenceVectorTab').length).toBe(1);

  });

  it('should push history by searchWord', () => {
    const component = mount(sideBar);
    const wrapper = component.find('SideBar');

    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => path);
    wrapper.find('#search-input').simulate('change', { target: { value: 'food' } });
    wrapper.find('.search-box').simulate('submit');
    expect(spyHistoryPush).toHaveBeenCalledWith('/main/food');
  });

  it('should push history to home and clear searchWord when clicking logo', () => {
    const component = mount(sideBar);
    const wrapper = component.find('SideBar');

    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation((path) => path); wrapper.find('#search-input').simulate('change', { target: { value: 'food' } });
    wrapper.find('#logo-button').simulate('click');
    // expect(spyHistoryPush).toHaveBeenCalledWith('/main/');
    expect(wrapper.state().searchWord).toBe('');
  });

  it('should render tabs when clicking tab-name-button', () => {
    let component = mount(sideBar);
    let wrapper = component.find('SideBar');
    let spyEditCurrentTab = jest.spyOn(actionCreators, 'editCurrentTab')
      .mockImplementation((dispatch) => () => {});
    expect(wrapper.find('.spyMyInfoTab').length).toBe(1);
    expect(wrapper.find('.spyLocationTab').length).toBe(0);
    expect(wrapper.find('.spyFoodCategoryTab').length).toBe(0);
    expect(wrapper.find('.spyPreferenceVectorTab').length).toBe(0);
    expect(wrapper.find('.tab-button-image-line .tab-button').length).toBe(4);

    wrapper.find('#location-tab-name-button').simulate('click');
    expect(spyEditCurrentTab).toHaveBeenCalledWith('Location');
    wrapper.find('#food-category-tab-name-button').simulate('click');
    expect(spyEditCurrentTab).toHaveBeenCalledWith('FoodCategory');
    wrapper.find('#preference-vector-tab-name-button').simulate('click');
    expect(spyEditCurrentTab).toHaveBeenCalledWith('PreferenceVector');
    wrapper.find('#my-info-tab-name-button').simulate('click');
    expect(spyEditCurrentTab).toHaveBeenCalledWith('MyInfo');
  });

  it('should change location at tab', () => {
    const component = mount(makeSideBar(makeMockStore('Location')));
    let wrapper = component.find('SideBar');
    expect(wrapper.find('.spyMyInfoTab').length).toBe(0);
    expect(wrapper.find('.spyLocationTab').length).toBe(1);
    expect(wrapper.find('.spyFoodCategoryTab').length).toBe(0);
    expect(wrapper.find('.spyPreferenceVectorTab').length).toBe(0);
    const tabWrapper = component.find('.spyLocationTab');

    tabWrapper.find('#spy-button').simulate('click');
    expect(wrapper.state().searchLocation).toBe('TEST');
  });

  it('should change category at tab', () => {
    const component = mount(makeSideBar(makeMockStore('FoodCategory')));
    let wrapper = component.find('SideBar');
    wrapper.find('.tab-button').at(2).simulate('click');
    expect(wrapper.find('.spyMyInfoTab').length).toBe(0);
    expect(wrapper.find('.spyLocationTab').length).toBe(0);
    expect(wrapper.find('.spyFoodCategoryTab').length).toBe(1);
    expect(wrapper.find('.spyPreferenceVectorTab').length).toBe(0);
    const tabWrapper = component.find('.spyFoodCategoryTab');
    let spyGetFoodCategory = jest.spyOn(actionCreators, 'getFoodCategory')
      .mockImplementation((dispatch) => () => {});

    // this is dummy for calling getDerivedStateFromProps
    tabWrapper.find('#spy-button').simulate('click');
    expect(wrapper.state().foodCategory).toEqual({
      한식: false,
    });
    tabWrapper.find('#spy-button').simulate('click');
    expect(wrapper.state().foodCategory).toEqual({
      한식: true,
    });

    tabWrapper.find('#spy-button-for-all').simulate('click');
    expect(wrapper.state().foodCategory).toEqual({
      한식: true,
    });

    tabWrapper.find('#spy-button-for-all').simulate('click');
    expect(wrapper.state().foodCategory).toEqual({
      한식: false,
    });

    wrapper.find('#spy-button-for-all').simulate('click');
    expect(wrapper.state().foodCategory).toEqual({
      한식: true,
    });
    expect(wrapper.state().selectAllCategory).toBe(true);

    wrapper.find('#spy-button').simulate('click');
    expect(wrapper.state().foodCategory).toEqual({
      한식: true,
    });
    expect(wrapper.state().selectAllCategory).toBe(false);

    wrapper.find('#spy-button-for-all').simulate('click');
    expect(wrapper.state().foodCategory).toEqual({
      한식: true,
    });
    expect(wrapper.state().selectAllCategory).toBe(true);
  });

  it('should change factor at tab', () => {
    const component = mount(makeSideBar(makeMockStore('PreferenceVector')));
    let wrapper = component.find('SideBar');
    expect(wrapper.find('.spyMyInfoTab').length).toBe(0);
    expect(wrapper.find('.spyLocationTab').length).toBe(0);
    expect(wrapper.find('.spyFoodCategoryTab').length).toBe(0);
    expect(wrapper.find('.spyPreferenceVectorTab').length).toBe(1);
    const tabWrapper = component.find('.spyPreferenceVectorTab');

    tabWrapper.find('#spy-button').simulate('click');
    wrapper = component.find('SideBar');
    // console.log(wrapper.state())
    /*
    expect(wrapper.state().preferenceVector).toEqual({
      '매운': 1,
    });
    */
  });
  it('should pass when nextProps is empty object', () => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {
        searchLocation: {
        },
        foodCategory: {
        },
        preferenceVector: {
        },

      },
      review: {},
    });
    const sideBarLoc = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <SideBar searchLocation={{}} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(sideBar);
  });
});
