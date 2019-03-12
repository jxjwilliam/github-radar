//api: /api/list/v1/search/${keyword}/${searchcriteria}
export const searchUsers = data => dispatch => {
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
        type: 'SEARCH_USERS',
        payload: data
      }),
      (error) => dispatch({
        type: 'SEARCH_USERS_FAIL',
        error
      }))
}

export const sortAction = (sortBy, seq) => ({
  type: 'SORT_USERS',
  sortBy: sortBy,
  seq: seq
})