import json

from app.graphql import flatten_response

GRAPHQL_RESPONSE = """
{
    "data": {
        "organization" : {
            "repositories": {
                "nodes": [
                    {
                        "name": "some-repo",
                        "pullRequests" : {
                            "nodes": [
                                {
                                    "title": "some-title",
                                    "updatedAt": "some-timestamp",
                                    "url": "some-url",
                                    "author": {
                                        "login": "some-login",
                                        "avatarUrl": "some-avatar-url"
                                    },
                                    "assignees": {
                                        "nodes": [
                                            {
                                                "login": "some-other-login",
                                                "avatarUrl": "some-other-avatar-url"
                                            }
                                        ]
                                    },
                                    "reviewRequests": {
                                        "nodes": [
                                            {
                                                "login": "some-third-login",
                                                "avatarUrl": "some-third-avatar-url"
                                            }
                                        ]
                                    },
                                    "labels": {
                                        "nodes": [
                                            {
                                                "name": "some-label"
                                            },
                                            {
                                                "name": "some-other-label"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }
}
"""

EXPECTED_RESULT = {
    "some-title": {
        "title": "some-title",
        "repo_name": "some-repo",
        "updated_at": "some-timestamp",
        "html_url": "some-url",
        "user": {
            "login": "some-login",
            "avatar_url": "some-avatar-url",
        },
        "labels": [
            { "name": "some-label" },
            { "name": "some-other-label" }
        ],
        "assignees": [
            {
                "login": "some-other-login",
                "avatar_url": "some-other-avatar-url",
            },
        ],
    },
}

def test_flatten_response():
    response = json.loads(GRAPHQL_RESPONSE)
    assert flatten_response(response) == EXPECTED_RESULT
