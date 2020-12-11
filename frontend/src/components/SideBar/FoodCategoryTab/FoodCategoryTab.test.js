import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { mount } from 'enzyme';
import { history } from '../../../store/store';
import getMockStore from '../../../test-utils/mocks';
import FoodCategoryTab from './FoodCategoryTab';
import * as actionCreators from '../../../store/actions/index';

const stubInitialState = {
  user: {
    foodCategory: {
      한식: true,
      양식: true,
      중식: true,
      일식: true,
      카페: true,
      패스트푸드: true,
      베트남음식: true,
      분식: false,
      디저트: true,
      주점: false,
    },
  },
  review: null,
  restaurant: null,
  keyword: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<FoodCategoryTab/>', () => {
  let foodcategory; let spyGetFoodCategory;
  beforeEach(() => {
    foodcategory = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <FoodCategoryTab />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    // spyGetFoodCategory = spyOn(actionCreators, 'getFoodCategory')
    //   .mockImplementation(() => {return dispatch => {}; });
  });
  it('should render properly', () => {
    const component = mount(foodcategory);
    const wrapper = component.find('.category');
    expect(wrapper.length).toBe(10);
    const instance = component.find(FoodCategoryTab.WrappedComponent).instance();
    expect(instance.state.foodCategory['분식']).toEqual(false);
  });
  it('should click properly', () => {
    // const spyEditUserFoodCategory = jest.spyOn(actionCreators, 'editUserFoodCategory')
    //   .mockImplementation(foodCategory => {return dispatch => {}; });
    const component = mount(foodcategory);
    const wrapper = component.find('#savebutton');
    wrapper.simulate('click');
  //  expect(spyEditUserFoodCategory).toBeCalledTimes(1);
  });
  it('should click image properly', () => {
    const component = mount(foodcategory);
    const wrapper = component.find('.checked');
    const firstimg = wrapper.at(0);
    firstimg.simulate('click');

    const instance = component.find(FoodCategoryTab.WrappedComponent).instance();
    expect(instance.state.foodCategory['한식']).toEqual(false);
  });
  it('should render properly when user foodcategory are all true', () => {
    const tempStubInitialState = {
      user: {
        foodCategory: {
          한식: true,
          양식: true,
          중식: true,
          일식: true,
          카페: true,
          패스트푸드: true,
          베트남음식: true,
          분식: true,
          디저트: true,
          주점: true,
        },
      },
      review: null,
      restaurant: null,
      keyword: null,
    };
    const tempMockStore = getMockStore(tempStubInitialState);
    const otherfoodcategory = (
      <Provider store={tempMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <FoodCategoryTab />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(otherfoodcategory);
    const wrapper = component.find(FoodCategoryTab.WrappedComponent).instance();
    expect(wrapper.state.foodCategory['분식']).toEqual(false);
  });
});
