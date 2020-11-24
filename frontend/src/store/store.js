import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import restaurantReducer from './reducers/restaurantReducer/restaurantReducer';
import reviewReducer from './reducers/reviewReducer/reviewReducer';
import userReducer from './reducers/userReducer/userReducer';

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  rs: restaurantReducer,
  rv: reviewReducer,
  us: userReducer,
  router: connectRouter(history),
});
export const middlewares = [thunk, routerMiddleware(history)];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ));

export default store;
