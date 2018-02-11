import { combineReducers } from 'redux';
import {todos, visibilityFilter} from './_todo_reducer';

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;