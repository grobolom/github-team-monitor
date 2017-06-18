import { combineReducers } from 'redux';
import auth from './auth'
import prs from './prs'
import teams from './teams'

const rootReducer = combineReducers({
  auth,
  prs,
  teams
});

export default rootReducer;
