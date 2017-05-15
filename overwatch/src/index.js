import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import Store from './store';

import './index.css';
import './polyfills.js';


const StoreInstance = Store({
  prs: [],
  teams: [],
});

fetch('//localhost:5000/teams')
  .then(response => response.json())
  .then(json => StoreInstance.dispatch({ type: 'receiveTeams', teams: json}))

fetch('//localhost:5000/teams/VID/issues')
  .then(response => response.json())
  .then(json => StoreInstance.dispatch({ type: 'receivePRs', prs: json}))

ReactDOM.render(
  <Provider store={StoreInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);
