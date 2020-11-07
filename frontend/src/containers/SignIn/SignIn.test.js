import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Signin from './SignIn';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/actionTypes';

const stubInitialState = {
  user: {
    id: 0,
    username: '',
    preferenceVector: {
      taste1: 1,
      taste2: 2,
      taste3: 3,
    },
    foodCategory: {
      Korean: true,
      Western: true,
      Chinese: false,
      Vietnamese: false,
    },
    searchLocation: {
      address: {
        address_name: '서울 관악구',
        b_code: '1162000000',
        h_code: '1162000000',
        main_address_no: '',
        mountain_yn: 'N',
        region_1depth_name: '서울',
        region_2depth_name: '관악구',
        region_3depth_h_name: '',
        region_3depth_name: '',
        sub_address_no: '',
        x: '126.951561853868',
        y: '37.4783683761333'
      },
      address_name: '서울 관악구',
      address_type: 'REGION',
      road_address: null,
      x: '126.951561853868',
      y: '37.4783683761333'
    },
  },
  keyword: null,
  restaurant: null,
  review: null,
}

const mockStore = getMockStore(stubInitialState);
describe('<SignIn />', () => {
  it ('does nothing', () => {
    expect(1).toBe(1);
  });
});
