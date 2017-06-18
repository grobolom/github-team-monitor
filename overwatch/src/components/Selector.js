import React, { Component, PropTypes } from 'react';

class Selector extends Component {
  render() {
    return (
      <div className='select'>
        <select
          onChange={ e => this.props.onChange(e.target.value) }
          name='team'
        >
          { this.props.teams.map(team =>
            <option value={team} key={team}>{team}</option>
          )}
        </select>
      </div>
    )
  }
}

Selector.propTypes = {
  teams: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Selector;
