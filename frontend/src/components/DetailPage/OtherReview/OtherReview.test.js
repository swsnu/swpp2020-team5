import React from 'react';
import { shallow } from 'enzyme';
import OtherReview from './OtherReview';

describe('</OtherReview />', () => {
  it('should render without errors', () => {
    const component = shallow(<OtherReview content="" />);
    const wrapper = component.find('.OtherReview');
    expect(wrapper.length).toBe(1);
  });

  it('should open/close the content when clicked', () => {
    const longContent = `This must be summarized. 
    Because the length of this content is too~~~~~ too~~~~~ 
    too~~~~~too~~~~~too~~~~~too~~~~~too~~~~~too~~~~~too~~~~~
    too~~~~~too~~~~~too~~~~long to ibe fit`;

    const component = shallow(<OtherReview
      content={longContent}
    />);
    const wrapper = component.find('.other-review-content');

    // initially rendered as summary
    expect(wrapper.text()).toBe(`This must be summarized. 
    Because the length of this content is too~~~~~ too...펼치기`);

    // should open the content.
    component.find('.open-content').simulate('click');
    const wrapper1 = component.find('.other-review-content');
    expect(wrapper1.text()).toBe(longContent);

    // should close the content
    component.find('.close-content').simulate('click');
    const wrapper2 = component.find('.other-review-content');
    expect(wrapper2.text()).toBe(`This must be summarized. 
    Because the length of this content is too~~~~~ too...펼치기`);
  });
});
