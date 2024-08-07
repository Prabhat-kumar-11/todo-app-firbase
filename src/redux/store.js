// src/store.js
import {combineReducers, applyMiddleware, legacy_createStore } from 'redux';
import todoReducer from './reducers/todoReducer';
import authReducer from './reducers/authReducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  todos: todoReducer,
  auth: authReducer,
});

const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
