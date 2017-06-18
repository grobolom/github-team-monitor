import React, { Component, PropTypes } from 'react';

class TeamList extends Component {
  render() {
    return (
      <div className='team-list'>
        <header>{this.props.name}</header>
        <ul>
          { this.props.members.map(member =>
            <li key={member}>{ member }</li>
          )}
        </ul>
      </div>
    )
  }
}

TeamList.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
}

export default TeamList;
