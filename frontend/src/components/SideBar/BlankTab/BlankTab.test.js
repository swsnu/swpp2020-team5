import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { mount } from 'enzyme';
import { history } from '../../../store/store';
import getMockStore from '../../../test-utils/mocks';
import BlankTab from './BlankTab';
import * as actionCreators from '../../../store/actions/index';

describe('<BlankTab/>', () => {
  it('should render properly', () => {
    const component = mount(<BlankTab/>);
    const wrapper = component.find('.BlankTab');
    expect(wrapper.length).toBe(1);
  });
});
