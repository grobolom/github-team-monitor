import { combineReducers } from 'redux';
import auth from './auth'
import all from './all'
import prs from './prs'
import teams from './teams'
import selectedTeam from './selectedTeam'

const rootReducer = combineReducers({
  auth,
  prs,
  all,
  teams,
  selectedTeam
});

export default rootReducer;
