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
const stubFoodCategory = {
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
}
const mockPostHandler = jest.fn();

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
              render={() => <FoodCategoryTab 
                              foodCategory={stubFoodCategory} 
                              postClickFoodCategoryHandler={mockPostHandler}
                              selectAll = {true}
                            />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
   // spyGetFoodCategory = spyOn(actionCreators, 'getFoodCategory')
    //  .mockImplementation(() => {return dispatch => {}; });
  });
  it('should render properly', () => {
    const component = mount(foodcategory);
    const wrapper = component.find('.category');
    expect(wrapper.length).toBe(11);
    
  });
  it('should click image properly', () => {
    const component = mount(foodcategory);
    const wrapper = component.find('.checked');
    const firstimg = wrapper.at(0);
    firstimg.simulate('click');
    expect(mockPostHandler).toHaveBeenCalledTimes(1);
  });
  it('should click total button properly', () => {
    const component = mount(foodcategory);
    const wrapper = component.find('#total-button');
    wrapper.simulate('click');
    expect(mockPostHandler).toHaveBeenCalledTimes(2);
  });
  it('should click total button properly', () => {
    const stubcategory = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <FoodCategoryTab 
                              foodCategory={stubFoodCategory} 
                              postClickFoodCategoryHandler={mockPostHandler}
                              selectAll = {false}
                            />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
    const component = mount(stubcategory);
    let wrapper = component.find('.checked');
    const firstimg = wrapper.at(0);
    firstimg.simulate('click');
    expect(mockPostHandler).toHaveBeenCalledTimes(3);
    wrapper = component.find('#total-button');
    wrapper.simulate('click');
    expect(mockPostHandler).toHaveBeenCalledTimes(4);
  });
});
