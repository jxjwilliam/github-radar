export const searchSOF = data => dispatch => {
  var keyword = data.search.trim();
  var url = "/api/stackoverflow/v1/search/" + keyword;
  //var url = "/data/stackoverflow.json";
  //var url = "https://api.stackexchange.com/2.2/search/advanced?key=5zKPVUV9moMdf8vmqAI6uQ((&site=stackoverflow&order=desc&sort=activity&filter=default&q=" + keyword;
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
        type: 'SEARCH_SOF',
        payload: data
      }),
      (error) => dispatch({
        type: 'SEARCH_SOF_FAIL',
        error
      }))
}

export const sortSOF = (sortBy, seq) => ({
  type: 'SORT_SOF',
  sortBy: sortBy,
  seq: seq
})