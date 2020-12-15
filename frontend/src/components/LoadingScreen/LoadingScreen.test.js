import React from 'react';
import { mount } from 'enzyme';
import LoadingScreen from './LoadingScreen';

describe('<LoadingScreen>', () => {
  it('should render SideBar ', () => {
    const component = mount(<LoadingScreen />);
    const wrapper = component.find('.loading-screen');
    expect(wrapper.length).toBe(1);
  });
});
