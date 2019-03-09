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
