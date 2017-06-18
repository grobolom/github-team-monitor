import { connect } from 'react-redux'
import React, { Component } from 'react'

import TeamSelector from './TeamSelector';
import TeamList from '../components/TeamList';

class TeamBuilder extends Component {
  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.dispatch({
        "key": e.keyCode,
        "type": "someaction",
      })
    }
  }

  render() {
    return (
      <div>
        <h3>TEAMS</h3>
        <TeamSelector teams={ this.props.names } />
        <div class='team-lists'>
          { this.props.teams.map(team =>
            <TeamList members={ team.members } name={ team.name } key={ team.name } />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teams: state.teams,
    names: state.teams.map((team) => team.name),
  }
}

export default connect(mapStateToProps)(TeamBuilder);
