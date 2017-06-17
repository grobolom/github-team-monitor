import React, { PropTypes, Component } from 'react'
import { getStatus } from '../helpers/labels'
import PullRequest from './PullRequest'

class PRList extends Component {
  crStatus(pr) {
    return getStatus('cr', pr.labels);
  }

  qaStatus(pr) {
    return getStatus('qa', pr.labels);
  }

  frStatus(pr) {
    return getStatus('fr', pr.labels);
  }

  mergeStatus(pr) {
    return getStatus('merge', pr.labels);
  }

  commentsStatus(pr) {
    return getStatus('unaddressed', pr.labels);
  }

  repoName(pr) {
    const repo = pr.repo_name
    if (repo === 'mediaplatform-edit-interface') {
      return 'edit'
    }
    return repo
  }

  prTitle(pr) {
    let title = pr.title
    const matches = title.match(/^([A-Za-z]{3})[ -]?([\d]{2,4})([ :\]]+)(.+)/)
    if (matches) {
      title = matches[1].toUpperCase() + '-' + matches[2] + ': ' + matches[4]
    }
    const limit = 65
    return title.length > limit ? title.substring(0, limit - 3) + '...' : title
  }

  prNumber(pr) {
    const matches = pr.title.match(/([A-Za-z]{3})[ -]?([\d]{3,4})([ :\]]+)(.+)/)
    if (matches) {
      return matches[1].toUpperCase() + '-' + matches[2]
    }
    return ''
  }

  sortPrs(prs) {
    return prs.sort(function(a, b) {
      if (a.title.toUpperCase() < b.title.toUpperCase()) {
        return -1
      }

      if (a.title.toUpperCase() > b.title.toUpperCase()) {
        return 1
      }

      return 0
    })
  }

  firstAssignee(pr) {
    if (pr.assignees[0]) {
      return pr.assignees[0].login
    }
    return ''
  }

  secondAssignee(pr) {
    if (pr.assignees[1]) {
      return pr.assignees[1].login
    }
    return ''
  }

  render() {
    return (
      <div>
        <h3>{this.props.category}</h3>
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
