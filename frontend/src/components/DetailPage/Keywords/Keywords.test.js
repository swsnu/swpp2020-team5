import React from 'react';
import { mount } from 'enzyme';

import Keywords from './Keywords';

jest.mock('react-wordcloud', () => () => <mock-widget />);
describe('<Keywords />', () => {
  it('should differ word color by size', () => {
    const component = mount(<Keywords/>);
    const wrapper = component.find('#cloud');
    const getWordColor = wrapper.getElement().props.callbacks.getWordColor;
    expect(getWordColor({text: '샤로수길', value: 0})).toBe('#AAAAAA');
    expect(getWordColor({text: '샤로수길', value: 23})).toBe('#000000');
  });
});
