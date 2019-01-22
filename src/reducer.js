import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import common from './reducers/common'
import auth from './reducers/auth'
import Users from './views/Users/Users.Reducers'

export default combineReducers({
  common,
  auth,
  Users,
  router: routerReducer
});
