import React, { Component, PropTypes } from 'react';

class TeamList extends Component {
  render() {
    return (
      <div className='teamList'>
        { this.props.members.map(member =>
          <div key={member}>{ member }</div>
        )}
      </div>
    )
  }
}

TeamList.propTypes = {
  members: PropTypes.array.isRequired,
}

export default TeamList;
