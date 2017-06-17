import React, { Component } from 'react'
import UserLine from './UserLine'

class PullRequest extends Component {
  render() {
    return (
      <li className='pull-request'>
        <div className='repo-name'>{ this.props.repoName }</div>
        <div className='pr-name'>
          <a href={ this.props.prURL }>{ this.props.prTitle }</a>
        </div>
        <div className='cr-status status'>
          <div className={ this.props.crStatus } > { this.props.crStatus }</div>
        </div>
        <div className='qa-status status'>
          <div className={ this.props.qaStatus } > { this.props.qaStatus }</div>
        </div>
        <div className='fr-status status'>
          <div className={ this.props.frStatus } > { this.props.frStatus }</div>
        </div>
        <div className='comments-status status'>
          <div className={ this.props.commentsStatus } > { this.props.commentsStatus }</div>
        </div>
        <div className='merge-status status'>
          <div className={ this.props.mergeStatus } > { this.props.mergeStatus }</div>
        </div>
        <div className='extras'>
          <UserLine
            name={ this.props.author }
            avatar={ this.props.authorAvatar }
          />
          { this.props.assignees.map((assignee, i) =>
            <UserLine
              key={ i }
              name={ assignee.login }
              avatar={ assignee.avatar_url }
            />
          )}
        </div>
      </li>
    )
  }
}

export default PullRequest