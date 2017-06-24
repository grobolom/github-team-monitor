import { connect } from 'react-redux'
import React from 'react'

import PRList from '../components/PRList';
import NavBar from '../components/NavBar';

class AllIssues extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <header>
          <h3>All Issues Ready For Release</h3>
        </header>
        <div>
          <PRList pullRequests={this.props.prs} category='Ready' />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    prs: state.all.filter(function(pr) { return pr.labels.map(function(label) { return label.name.toLowerCase(); }).includes('ready to merge'); }),
  }
}

export default connect(mapStateToProps)(AllIssues);
