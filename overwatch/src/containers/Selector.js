import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchIssues } from '../actions'
import TeamSelector from '../components/TeamSelector'

class Selector extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.props.dispatch(fetchIssues(value))
  }

  render() {
    return (
      <TeamSelector
        onChange={ this.handleChange }
        teams={ this.props.teams }
      />
    )
  }
}

Selector.propTypes = {
  dispatch: PropTypes.func.isRequired,
  teams: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Selector)
