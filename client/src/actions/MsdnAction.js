import {fetching } from '../utils'

const action_succ = data => ({
  type: 'SEARCH_MSDN',
  payload: data
})

const action_fail = error => ({
  type: 'SEARCH_MSDN_FAIL',
  error
})

const MSDN_URL = "/api/msdn/v1/search/"

export const searchMSDN = data => dispatch => {
  var keyword = data.search.trim();
  var url =  MSDN_URL + keyword;

  return fetching(url)
    .then(res => res.json())
    .then(
      (data) => dispatch(action_succ(data)),
      (error) => dispatch(action_fail(error)))
}

export const sortMSDN = (sortBy, seq) => ({
  type: 'SORT_MSDN',
  sortBy: sortBy,
  seq: seq
})