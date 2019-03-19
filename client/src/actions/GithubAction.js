export const searchGithub = data => dispatch => {
  var keyword = data.search.trim();
  var criteria = data.criteria ? data.criteria : 'repositories';
  var url = "/api/github/v1/search/" + keyword + '/' + criteria;

  var headers = {
    "Content-type": "application/json",
    "Accept": "application/json",
  }

  return fetch(url, {
    method: 'GET',
    headers: headers
  })
    .then(res => res.json())
    .then(
      (data) => dispatch({
        type: 'SEARCH_GITHUB',
        payload: data
      }),
      (error) => dispatch({
        type: 'SEARCH_GITHUB_FAIL',
        error
      }))
}

export const sortGithub = (sortBy, seq) => ({
  type: 'SORT_GITHUB',
  sortBy: sortBy,
  seq: seq
})