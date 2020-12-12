import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import { history } from '../../../store/store';
import getMockStore from '../../../test-utils/mocks';

import RestaurantSummary from './RestaurantSummary';

describe('<RestaurantSummary />', () => {
  const stubInitialState = {
    user: null,
    keyword: null,
    restaurant: null,
    review: null,
  };
  const mockStore = getMockStore(stubInitialState);

  let restaurantSummary;
  beforeEach(() => {
    restaurantSummary = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <RestaurantSummary
                  id={1}
                  category={[
                    '한식',
                    '두식',
                  ]}
                  preferenceVector={
                                {
                                  삼삼: 1,
                                  슴슴: 2,
                                  심심: 3,
                                }
                              }
                  img_url_list={
                    ['a', 'b']
                  }
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should rener without errors', () => {
    const component = mount(restaurantSummary);
    const wrapper = component.find('.summary');
    expect(wrapper.length).toBe(1);
  });

  it('should call \'onClickRestaurantHandler\'', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => {});
    const component = mount(restaurantSummary);

    let wrapper = component.find('.rate').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/detail/1');

    wrapper = component.find('.title').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/detail/1');

    wrapper = component.find('.image').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/detail/1');
    const event = {
      target: {
        src: '',
      },
    };
    wrapper.prop('onError').call(null, event);
    restaurantSummary = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <RestaurantSummary
                  id={1}
                  category={[
                    '한식',
                    '두식',
                  ]}
                  preferenceVector={
                                {
                                  삼삼: 1,
                                  슴슴: 2,
                                  심심: 3,
                                }
                              }
                  img_url_list={
                    []
                  }
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const anotherComponent = mount(restaurantSummary);
    wrapper = anotherComponent.find('.image').at(0);
    wrapper.prop('onError').call(null, event);
  });
});
