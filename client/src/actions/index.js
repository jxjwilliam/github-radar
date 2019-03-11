
const _common = (url, actionType) => (page = 1) => dispatch => {
  return fetch(url + page)
    .then(res => res.json())
    .then(
      (data) => dispatch({ type: actionType, payload: data }),
      (error) => dispatch({ type: actionType + '_FAIL', error }));
};

export const searchUsers = keyword => dispatch => {
  return fetch(`/api/list/search/${keyword}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(res => res.json())
    .then(
      (data) => dispatch({ type: 'SEARCH_USERS', payload: data }),
      (error) => dispatch({ type: 'SEARCH_USERS_FAIL', error }));
};

export const sortAction = (sortBy, seq) => ({
  type: 'SORT_USERS',
  sortBy: sortBy,
  seq: seq
});

// 1. Action creators
export const addReposAction = jsonResult => ({
  type: 'ADD_TWEETS',
  repos: jsonResult
});

export const userChangedAction = value => ({
  type: 'USER_CHANGED',
  value: value
});

export const loadingChangedAction = isLoading => ({
  type: 'IS_LOADING',
  isLoading: isLoading
});

export const loadReposAction = user => dispatch => {
  const url = '/api/github/' + user;
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  };
  dispatch(loadingChangedAction(true));

  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => {
      dispatch(loadingChangedAction(false));
      dispatch(addReposAction(data));
    });
};
