export const searchYoutube = data => dispatch => {
  var keyword = data.search.trim();
  var url = "/api/youtube/v1/search/" + keyword;

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
        type: 'SEARCH_YOUTUBE',
        payload: data
      }),
      (error) => dispatch({
        type: 'SEARCH_YOUTUBE_FAIL',
        error
      }))
}

export const sortYoutube = (sortBy, seq) => ({
  type: 'SORT_YOUTUBE',
  sortBy: sortBy,
  seq: seq
})