import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import Store from './store';

import {
  fetchTeams, fetchIssues, fetchAllIssues, setAuthorizationToken
} from './actions'

import '../public/css/core.css';
import '../public/css/builder.css';
import '../public/css/monitor.css';
import '../public/css/navbar.css';
import './polyfills.js';

const StoreInstance = Store({
  prs: [],
  teams: [],
});

setAuthorizationToken(localStorage.jwtToken)

StoreInstance.dispatch(fetchTeams())
StoreInstance.dispatch(fetchIssues('VID'))
StoreInstance.dispatch(fetchAllIssues())

ReactDOM.render(
  <Root store={StoreInstance} />,
  document.getElementById('root')
);
