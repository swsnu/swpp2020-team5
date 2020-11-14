import React from 'react';
import { shallow } from 'enzyme';
import OtherReview from './OtherReview.js';

describe('</OtherReview />', () => {
  it('should render without errors', () => {
    const component = shallow(<OtherReview content="" />);
    const wrapper = component.find('.OtherReview');
    expect(wrapper.length).toBe(1);
  });

  it('should open/close the content when clicked', () => {
    const component = shallow(<OtherReview content="This must be summarized" />);
    const wrapper = component.find('.other-review-content');

    // initially rendered as summary
    expect(wrapper.text()).toBe('This must ...');

    // should open the content.
    wrapper.simulate('click');
    const wrapper1 = component.find('.other-review-content');
    expect(wrapper1.text()).toBe('This must be summarized');

    // should close the content
    wrapper.simulate('click');
    const wrapper2 = component.find('.other-review-content');
    expect(wrapper2.text()).toBe('This must ...');
  });
});
