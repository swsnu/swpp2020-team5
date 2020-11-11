import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { history, middlewares } from '../store/store';

const getMockKeywordReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);
const getMockRestaurantReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);
const getMockReviewReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);
const getMockUserReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

export const getMockStore = (initialState) => {
  const mockKeywordReducer = getMockKeywordReducer(initialState.keyword);
  const mockRestaurantReducer = getMockRestaurantReducer(initialState.restaurant);
  const mockReviewReducer = getMockReviewReducer(initialState.review);
  const mockUserReducer = getMockUserReducer(initialState.user);
  const rootReducer = combineReducers({
    kw: mockKeywordReducer,
    rs: mockRestaurantReducer,
    rv: mockReviewReducer,
    us: mockUserReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};
