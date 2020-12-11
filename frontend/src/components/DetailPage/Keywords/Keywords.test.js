import React from 'react';
import { mount } from 'enzyme';

import Keywords from './Keywords';

jest.mock('react-wordcloud', () => () => <mock-widget />);

describe('<Keywords />', () => {
  it('should differ word color by size', () => {
    const component = mount(<Keywords keywords={{"맛나": 0,"아맛나": 1, "겁나": 100}}/>);
    const wrapper = component.find('#cloud');
    const { getWordColor, onWordClick, onWordMouseOver, getWordTooltip } = wrapper.getElement().props.callbacks;
    const word = {text: "a", value: 100};
    getWordColor({text: "a", value: 1});
    getWordColor(word);
    onWordClick(word);
    onWordMouseOver(word);
    getWordTooltip(word);
  });
});
