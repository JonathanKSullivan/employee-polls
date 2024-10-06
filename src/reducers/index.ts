import { combineReducers } from 'redux';
import polls from './polls';
import users from './users';
import authedUser from './authedUser';

export default combineReducers({
  authedUser,
  polls,
  users,
});
