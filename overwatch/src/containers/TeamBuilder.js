import { connect } from 'react-redux'
import React, { Component } from 'react'

import TeamSelector from './TeamSelector';
import TeamList from '../components/TeamList';

class TeamBuilder extends Component {
  render() {
    return (
      <div>
        <h3>TEAMS</h3>
        <TeamSelector teams={ this.props.teams } />
        <TeamList members={ this.props.members } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teams: state.teams.map((team) => team.name ),
    members: state.teams[0] ? state.teams[0].members : [],
  }
}

export default connect(mapStateToProps)(TeamBuilder);
