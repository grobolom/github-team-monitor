import React, { PropTypes, Component } from 'react'
import { getStatus } from '../helpers/labels'
import PullRequest from './PullRequest'

class PRList extends Component {
  crStatus = (pr) => getStatus('cr', pr.labels)
  qaStatus = (pr) => getStatus('qa', pr.labels)
  frStatus = (pr) => getStatus('fr', pr.labels)
  mergeStatus = (pr) => getStatus('merge', pr.labels)
  commentsStatus = (pr) => getStatus('unaddressed', pr.labels)

  repoName = (pr) =>
    pr.repo_name === 'mediaplatform-edit-interface' ? 'edit' : pr.repo_name

  prTitle(pr) {
    let title = pr.title
    const matches = title.match(/^([A-Za-z]{3})[ -]?([\d]{2,4})([ :\]]+)(.+)/)
    if (matches) {
      title = matches[1].toUpperCase() + '-' + matches[2] + ': ' + matches[4]
    }
    const limit = 65
    return title.length > limit ? title.substring(0, limit - 3) + '...' : title
  }

  render() {
    return (
      <div>
        <h3 className="category">{this.props.category}</h3>
        <ul className='pull-requests'>
          <li className='pull-request header'>
            <div className='repo-name'>Repo</div>
            <div className='pr-name'>Title</div>
            <div className='cr-status status'>CR</div>
            <div className='qa-status status'>QA</div>
            <div className='fr-status status'>FR</div>
            <div className='comments-status status'>Comments</div>
            <div className='merge-status status'>Merge</div>
          </li>
          { (this.props.pullRequests).map((pr, i) =>
            <PullRequest
              key={i}
              repoName={ this.repoName(pr) }
              prUrl={ pr.html_url }
              prTitle={ this.prTitle(pr) }
              crStatus={ this.crStatus(pr) }
              qaStatus={ this.qaStatus(pr) }
              frStatus={ this.frStatus(pr) }
              commentsStatus={ this.commentsStatus(pr) }
              mergeStatus={ this.mergeStatus(pr) }
              author={ pr.user.login }
              authorAvatar={ pr.user.avatar_url }
              assignees={ pr.assignees }
            />
          )}
        </ul>
      </div>
    );
  }
}

PRList.propTypes = {
  pullRequests: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
}

export default PRList;
