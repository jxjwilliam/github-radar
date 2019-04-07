import {fetching } from '../utils'

const action_succ = data => ({
  type: 'SEARCH_GITHUB',
  payload: data
})

const action_fail = error => ({
  type: 'SEARCH_GITHUB_FAIL',
  error
})

const GITHUB_URL = "/api/github/v1/search/"

export const searchGithub = data => dispatch => {
  var keyword = data.search.trim();
  var criteria = data.criteria ? data.criteria : 'repositories';
  var url = GITHUB_URL + keyword + '/' + criteria;

  return fetching(url)
    .then(res => res.json())
    .then(
      (data) => dispatch(action_succ(data)),
      (error) => dispatch(action_fail(error))
    )
}

export const sortGithub = (sortBy, seq) => ({
  type: 'SORT_GITHUB',
  sortBy: sortBy,
  seq: seq
})