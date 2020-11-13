import React from 'react';
import {mount} from 'enzyme';
import {getMockStore} from '../../test-utils/mocks';
import {history} from '../../store/store';
import DetailPage from './DetailPage';
import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import {Route,Switch} from 'react-router-dom';