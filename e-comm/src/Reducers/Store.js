import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import combineReducers from './CombinedReducer'

// redux thunk vs redux-saga
const store = createStore(combineReducers, applyMiddleware(thunk, logger));
console.log(store.getState());
export default store;