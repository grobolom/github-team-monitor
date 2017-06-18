import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import Store from './store';
import { fetchTeams, fetchIssues } from './actions'

import '../public/css/core.css';
import '../public/css/builder.css';
import '../public/css/monitor.css';
import '../public/css/navbar.css';
import './polyfills.js';

const StoreInstance = Store({
  prs: [],
  teams: [],
});

StoreInstance.dispatch(fetchTeams())
StoreInstance.dispatch(fetchIssues('VID'))

/*
fetch('//localhost:5000/teams')
  .then(response => response.json())
  .then(json => StoreInstance.dispatch({ type: 'receiveTeams', teams: json}))

fetch('//localhost:5000/teams/VID/issues')
  .then(response => response.json())
  .then(json => StoreInstance.dispatch({ type: 'receivePRs', prs: json}))
*/

ReactDOM.render(
  <Root store={StoreInstance} />,
  document.getElementById('root')
);
