import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, browserHistory } from 'react-router'

import Monitor from './Monitor'
import AllIssues from './AllIssues'
import TeamBuilder from './TeamBuilder'
import Authenticate from './Authenticate'
import LoginPage from '../components/LoginPage'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/monitor" />
      <Route path="/monitor" component={Authenticate(Monitor)} />
      <Route path="/all" component={Authenticate(AllIssues)} />
      <Route path="/teams" component={Authenticate(TeamBuilder)} />
      <Route path="/login" component={LoginPage} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root