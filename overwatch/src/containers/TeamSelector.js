import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectTeam, fetchIssues } from '../actions'
import Selector from '../components/Selector'

class TeamSelector extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.props.dispatch(selectTeam(value))
    this.props.dispatch(fetchIssues(value))
  }

  render() {
    return (
      <Selector
        onChange={ this.handleChange }
        teams={ this.props.teams }
      />
    )
  }
}

TeamSelector.propTypes = {
  dispatch: PropTypes.func.isRequired,
  teams: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(TeamSelector)
