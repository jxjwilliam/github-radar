import {fetching} from '../utils';

const action_succ = data => ({
  type: 'SEARCH_SOF',
  payload: data
})

const action_fail = error => ({
  type: 'SEARCH_SOF_FAIL',
  error
})

const SOF_URL = "/api/stackoverflow/v1/search/";

/**
 * url = "/data/stackoverflow.json";
 * url = "https://api.stackexchange.com/2.2/search/advanced?key=5zKPVUV9moMdf8vmqAI6uQ((&
 *  site=stackoverflow&order=desc&sort=activity&filter=default&q=" + keyword;
 */
export const searchSOF = sof_search_form => dispatch => {

  var keyword = sof_search_form.search.trim();
  var url = SOF_URL + keyword;

  return fetching(url)
    .then(res => res.json())
    .then(
      (data) => dispatch(action_succ(data)),
      (error) => dispatch(action_fail(error))
    )
}

export const sortSOF = (sortBy, seq) => ({
  type: 'SORT_SOF',
  sortBy: sortBy,
  seq: seq
})
