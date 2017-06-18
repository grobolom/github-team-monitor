import React from 'react'
import { connect } from 'react-redux'

export default (ComposedComponent) => {
  class Authenticate extends React.Component {
    componentWillMount = () => {
      if (!this.props.isAuthenticated) {
        this.context.router.push('/monitor')
      }
    }

    componentWillUpdate = (nextProps) => {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/monitor')
      }
    }

    render = () => (
      <ComposedComponent {...this.props} />
    )
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.isAuthenticated,
    }
  }

  return connect(mapStateToProps)(Authenticate);
}