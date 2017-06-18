import React, { Component, PropTypes } from 'react';

class TeamList extends Component {
  render() {
    return (
      <ul className='teamList'>
        { this.props.members.map(member =>
          <li key={member}>{ member }</li>
        )}
      </ul>
    )
  }
}

TeamList.propTypes = {
  members: PropTypes.array.isRequired,
}

export default TeamList;
