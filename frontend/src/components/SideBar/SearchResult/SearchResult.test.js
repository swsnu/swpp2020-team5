import React from 'react';
import { shallow } from 'enzyme';

import SearchResult from './SearchResult';

describe('<SearchResult />', () => {
  it('should get props properly', () => {
    const component = shallow(<SearchResult address_name="옹헤야" />);
    const wrapper = component.find('.searchResult');
    expect(wrapper.length).toBe(1);
  });
});
