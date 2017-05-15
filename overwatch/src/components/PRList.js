import React, { PropTypes, Component } from 'react'

const statuses = {
  cr: {
    'ready for review': 'ready',
    'needs peer review': 'ready',
    'in peer review': 'in-progress',
    'peer review': 'in-progress',
    'code review pass': 'pass',
  },
  qa: {
    'ready for qa': 'ready',
    'needs qa': 'ready',
    'in testing by qa': 'in-progress',
    'testing complete': 'pass',
  },
  fr: {
    'ready for feature review': 'ready',
    'needs feature review': 'ready',
    'in feature review': 'in-progress',
    'feature review passed': 'pass',
  },
  merge: {
    'requires unmerged dependency in other repo': 'dependency',
    'ready to merge': 'ready',
  },
  unaddressed: {
    'has unaddressed comments': 'comments',
  },
}

function getStatus(type, labels) {
  const names = labels.map(function(label) {
    return label.name.toLowerCase();
  })

  const found = Object.keys(statuses[type]).find(function(label) {
    return names.includes(label);
  });

  return found ? statuses[type][found] : 'hidden';
}

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
            <li className='pull-request' key={i}>
              <div className='repo-name'>{ this.repoName(pr) }</div>
              <div className='pr-name'>
                <a href={ pr.html_url }>{ this.prTitle(pr) }</a>
              </div>
              <div className='cr-status status { this.crStatus(pr) }'>
                <div className={ this.crStatus(pr) + ' label'} > { this.crStatus(pr) }</div>
              </div>
              <div className='qa-status status { this.qaStatus(pr) }'>
                <div className={ this.qaStatus(pr) + ' label'} > { this.qaStatus(pr) }</div>
              </div>
              <div className='fr-status status { this.frStatus(pr) }'>
                <div className={ this.frStatus(pr) + ' label'} > { this.frStatus(pr) }</div>
              </div>
              <div className='comments-status status { this.commentsStatus(pr) }'>
                <div className={ this.commentsStatus(pr) + ' comments-status label'} > { this.commentsStatus(pr) }</div>
              </div>
              <div className='merge-status status { this.mergeStatus(pr) }'>
                <div className={ this.mergeStatus(pr) + ' merge-status label'} > { this.mergeStatus(pr) }</div>
              </div>
              <div className='extras'>
                <div className='author'>
                  <img height='20' width='20' src={ pr.user.avatar_url } />
                  <span>{ pr.user.login }</span>
                </div>
                { pr.assignees.map((assignee, i) =>
                  <div className='assignee' key={assignee.login}>
                    <img height='20' width='20' src={ assignee.avatar_url } />
                    <span>{ assignee.login }</span>
                  </div>
                )}
              </div>
            </li>
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
