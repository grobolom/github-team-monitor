query = '''

query {
  organization(login: "%s") {
    repositories(first: 100) {
      nodes {
        name
        pullRequests(first: 100, states: [OPEN]) {
          nodes {
            author {
              login
              avatarUrl
            }
            assignees(first: 5) {
              nodes {
                login
                avatarUrl
              }
            }
            reviewRequests(first: 5) {
              nodes {
                reviewer {
                  login
                  avatarUrl
                }
              }
            }
            labels(first: 8) {
              nodes {
                name
              }
            }
            title
            url
            updatedAt
          }
        }
      }
    }
  }
}
'''


def flatten_response(response):
    data = response['data']
    org = data['organization']

    prs = {}

    for rep in org['repositories']['nodes']:
        for pr in rep['pullRequests']['nodes']:
            prs[pr['title']] = {
                'title': pr['title'],
                'repo_name': rep['name'],
                'updated_at': pr['updatedAt'],
                'html_url': pr['url'],
                'labels': [{'name': label['name']} for label in pr['labels']['nodes']],
                'user': {
                    'login': pr['author']['login'],
                },
                'assignees': [{'login': assignee['login']} for assignee in pr['assignees']['nodes']]
            }

    return prs
