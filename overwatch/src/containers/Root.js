import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, browserHistory } from 'react-router'

import Monitor from './Monitor'
import TeamBuilder from './TeamBuilder'
import Authenticate from './Authenticate'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/monitor" />
      <Route path="/monitor" component={Monitor} />
      <Route path="/teams" component={Authenticate(TeamBuilder)} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root