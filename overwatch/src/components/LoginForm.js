import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true })
    this.props.login(this.state).then(
      (res) => this.context.router.push('/teams'),
      (err) => this.setState({ isLoading: false })
    )
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { username, password, isLoading } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        <div className='form-row'>
          <label>
            Username / Email
            <input
              type='text'
              id='username'
              name='username'
              label='Username / Email'
              onChange={ this.onChange }
              value={username} />
          </label>
        </div>

        <div className='form-row'>
          <label>
            Password
            <input
              type='password'
              id='password'
              name='password'
              label='Password'
              onChange={ this.onChange }
              value={password} />
          </label>
        </div>

        <div className='form-row'>
          <button disabled={isLoading}>Login</button>
        </div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

export default connect(null, { login })(LoginForm)