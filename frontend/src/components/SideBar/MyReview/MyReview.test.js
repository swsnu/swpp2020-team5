import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import MyReview from './MyReview';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/reviewActions/reviewActions'

describe('<MyReview />', () => {
  let myReview;
  afterEach(() => { jest.clearAllMocks(); });
  beforeEach(() => {
    const mockStore = getMockStore({
      keyword: {},
      restaurant: {},
      user: {},
      review: {}
    });
    myReview = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact
              render={() => <MyReview reviewID={1} content='TEST_CONTENT' rating={3} modifiedTime='TEST_TIME'/>}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  it('should render MyReview', () => {
    const component = mount(myReview);
    expect(component.find('MyReview').length).toBe(1)
  });

  it('should show rating, modifiedTime and content', () => {
    const component = mount(myReview);
    let wrapper = component.find('MyReview');
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
    wrapper.find('#content-input').simulate('change', {target: {value: 'EDITED_CONTENT'}})
    expect(wrapper.state().content).toBe('EDITED_CONTENT');
    let spyPutReview = jest.spyOn(actionCreators, 'putReview')
      .mockImplementation((id, info) => {return dispatch => {}})

    const mockDate = new Date(1466424490000)
    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDate)

    wrapper.find('#review-edit-done-button').simulate('click')

    expect(spyPutReview).toHaveBeenCalledTimes(1)
    expect(spyPutReview).toHaveBeenCalledWith({
      id: 1,
      content: 'EDITED_CONTENT',
      rating: 3,
      modifiedTime: mockDate.toLocaleDateString()
    })
  });

  it('should edit rating, modifiedTime and content', () => {
    const component = mount(myReview);
    let wrapper = component.find('MyReview');
    let spyPutReview = jest.spyOn(actionCreators, 'deleteReview')
      .mockImplementation((id) => {return dispatch => {}})
    wrapper.find('#review-delete-button').simulate('click');

    
  })
})
