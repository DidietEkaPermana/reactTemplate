import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import common from './reducers/common'
import auth from './reducers/auth'

export default combineReducers({
  common,
  auth,
  router: routerReducer
});
