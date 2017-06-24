import React, { Component } from 'react';
import { Link } from 'react-router'

class NavBar extends Component {
  render() {
    return (
      <div className='nav-bar'>
        <Link to='/monitor'  activeStyle={{
          textDecoration: 'none',
          color: 'black'
        }}>Monitor</Link>
        <Link to='/teams' activeStyle={{
          textDecoration: 'none',
          color: 'black'
        }}>Teams</Link>
        <Link to='/all' activeStyle={{
          textDecoration: 'none',
          color: 'black'
        }}>All Issues</Link>
        <Link to='/login' activeStyle={{
          textDecoration: 'none',
          color: 'black'
        }}>Login</Link>

      </div>
    )
  }
}

export default NavBar;
