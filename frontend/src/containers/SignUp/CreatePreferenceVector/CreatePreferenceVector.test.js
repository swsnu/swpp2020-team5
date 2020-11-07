import React from 'react';
import { mount } from 'enzyme';
import CreatePreferenceVector from './CreatePreferenceVector';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/index';

describe('<CreatePreferenceVector />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    
  })

  it('should call postSignUp when click confirm-button', () => {
    let spyPostSignUp = jest.spyOn(actionCreators, 'postSignUp')
  })
})
