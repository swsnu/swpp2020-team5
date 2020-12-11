import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import MyReview from './MyReview';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/reviewActions/reviewActions';

describe('<MyReview />', () => {
  let myReview;
  afterEach(() => { jest.clearAllMocks(); });
  beforeEach(() => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {},
      review: {},
    });
    myReview = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <MyReview reviewID={1} content="TEST_CONTENT" rating={3} date="TEST_TIME" />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render MyReview', () => {
    const component = mount(myReview);
    expect(component.find('MyReview').length).toBe(1);
  });

  it('should show rating, modifiedTime and content', () => {
    const component = mount(myReview);
    const wrapper = component.find('MyReview');
    expect(wrapper.find('#rating-text').text()).toBe('3');
    expect(wrapper.find('#modified-time-text').text()).toBe('TEST_TIME');
    expect(wrapper.find('#content-text').text()).toBe('TEST_CONTENT');
  });

  it('should edit rating, modifiedTime and content', () => {
    const component = mount(myReview);
    let wrapper = component.find('MyReview');
    expect(wrapper.state().isEdit).toBe(false);
    wrapper.find('#review-edit-button').simulate('click');
    wrapper = component.find('MyReview');
    expect(wrapper.state().isEdit).toBe(true);
    wrapper.find('#review-cancel-button').simulate('click');
    wrapper = component.find('MyReview');
    expect(wrapper.state().isEdit).toBe(false);
    wrapper.find('#review-edit-button').simulate('click');
    wrapper = component.find('MyReview');
    wrapper.find('#content-input').simulate('change', { target: { value: 'EDITED_CONTENT' } });
    expect(wrapper.state().content).toBe('EDITED_CONTENT');
    expect(wrapper.find('ReactStars').length).toBe(1);
    wrapper.find('ReactStars').find('Star').at(0).simulate('click');
    expect(wrapper.state().rating).toBe(0.5);

    const spyPutReview = jest.spyOn(actionCreators, 'editMyReview')
      .mockImplementation((id, info) => (dispatch) => {});

    const DATE_TO_USE = new Date('2016');
    const mockDate = Date;
    global.Date = jest.fn(() => DATE_TO_USE);
    global.Date.UTC = mockDate.UTC;
    global.Date.parse = mockDate.parse;
    global.Date.now = mockDate.now;

    expect(wrapper.find('#review-edit-done-button').length).toBe(1);
    wrapper.find('#review-edit-done-button').simulate('click');

    expect(spyPutReview).toHaveBeenCalledTimes(1);
    expect(spyPutReview).toHaveBeenCalledWith({
      id: 1,
      content: 'EDITED_CONTENT',
      rating: 0.5,
      date: DATE_TO_USE,
    });
    expect(wrapper.state().isEdit).toBe(false);
  });

  it('should delete comment', () => {
    const component = mount(myReview);
    const wrapper = component.find('MyReview');
    const spyDeleteReview = jest.spyOn(actionCreators, 'deleteMyReview')
      .mockImplementation((id) => (dispatch) => {});
    window.confirm = jest.fn(() => false);
    wrapper.find('#review-delete-button').simulate('click');
    window.confirm = jest.fn(() => true);
    wrapper.find('#review-delete-button').simulate('click');
    expect(spyDeleteReview).toHaveBeenCalledTimes(1);
  });
});
