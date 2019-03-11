# Quick Start

```bash
$ cd server && npm install
$ cd client && npm install
$ npm start
$ open http://locahost:3000
```

# Development Environment
## 1. client

- running on port 3000 by default.
- all xhr requests are sent to local `Server` which acts as a delegate gateway.

## 2. Server

- listening on port 8000 by default.
- fetch data from https://api.github.com/
- connected with `MongoDB`
- connected with `Redis` (TODO)
- analysis results, adding computing and storage.
- send Restful JSON-documents to frontend

# Production

Production version will be deployed to cloud service, with https, cloud storage, caching etc.

> https://dry-cliffs-21510.herokuapp.com/


# TODO

- virtualization


# Reference

- https://developer.github.com/v3/search/#search-repositories
- https://developer.github.com/v3/search/

| Name | Type | Description |
| -- | -- | -- |
| q | string | Required. The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as GitHub.com. To learn more about the format of the query, see Constructing a search query. See "Searching for repositories" for a detailed list of qualifiers. |
| sort | string | Sorts the results of your query by number of stars, forks, or help-wanted-issues or how recently the items were updated. Default: best match |
| order | string | Determines whether the first search result returned is the highest number of matches (desc) or lowest number of matches (asc). This parameter is ignored unless you provide sort. Default: desc |

```javascript

https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc

q=SEARCH_KEYWORD_1+SEARCH_KEYWORD_N+QUALIFIER_1+QUALIFIER_N

```

more.

