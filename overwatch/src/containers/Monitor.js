import { connect } from 'react-redux'
import React, { Component } from 'react'

import PRList from '../components/PRList';
import NavBar from '../components/NavBar';
import TeamSelector from './TeamSelector';

class Monitor extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h3>Github Team PR Status Monitor</h3>
        <TeamSelector teams={this.props.teams} />
        <div>
          <PRList pullRequests={this.props.forReview.prs} category='Review' />
          <PRList pullRequests={this.props.completed.prs} category='Completed' />
          <PRList pullRequests={this.props.inDev.prs} category='In Development' />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teams: state.teams.map(function(team) { return team.name; }),
    inDev: {
      prs: state.prs.filter(function(pr) { return pr.labels.length === 1 && pr.labels[0].name.toLowerCase() === 'in development'; }),
    },
    completed: {
      prs: state.prs.filter(function(pr) { return pr.labels.map(function(label) { return label.name.toLowerCase(); }).includes('ready to merge'); }),
    },
    forReview: {
      prs: state.prs.filter(function(pr) {
        return !(pr.labels.length === 1 && pr.labels[0].name.toLowerCase() === 'in development') &&
          !(pr.labels.map(function(label) { return label.name.toLowerCase(); }).includes('ready to merge'));
      }),
    }
  }
}

export default connect(mapStateToProps)(Monitor);
