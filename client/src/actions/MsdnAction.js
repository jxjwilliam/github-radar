export const searchMSDN = data => dispatch => {
  var keyword = data.search.trim();
  var criteria = data.criteria ? data.criteria : 'repositories';
  var url = "/api/msdn/v1/search/" + keyword + '/' + criteria;

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
        type: 'SEARCH_MSDN',
        payload: data
      }),
      (error) => dispatch({
        type: 'SEARCH_MSDN_FAIL',
        error
      }))
}

export const sortMSDN = (sortBy, seq) => ({
  type: 'SORT_MSDN',
  sortBy: sortBy,
  seq: seq
})