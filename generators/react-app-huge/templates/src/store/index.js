import {createStore} from 'redux';
import reducer from '../reducers';

let configureStore = (initialState) => {
  return createStore(reducer, initialState);
};

export default configureStore;