import React, { Component } from 'react'

class UserLine extends Component {
  render() {
    return (
      <div className='user'>
        <img height='20' width='20' src={ this.props.avatar } alt='avatar for user' />
        <span>{ this.props.name }</span>
      </div>
    )
  }
}

export default UserLine