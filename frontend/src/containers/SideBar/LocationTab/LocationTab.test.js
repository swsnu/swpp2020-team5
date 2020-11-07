import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import LocationTab from './LocationTab';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/actionTypes';

describe('<LocationTab />', () => {
  it ('does nothing', () => {
    expect(1).toBe(1);
  });
});
