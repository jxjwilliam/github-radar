// TODO: "x-access-token": token
const PREFIX_URL = '/api/list';
const _common = (url, actionType) => (page = 1) => dispatch => {
  return fetch(url + page)
    .then(res => res.json())
    .then(
      (data) => dispatch({type: actionType, payload: data}),
      (error) => dispatch({type: actionType + '_FAIL', error}))
}

/* /api/list/page/1, 2, ... */
export const getUsers = _common(PREFIX_URL + '/page/', 'FETCH_USERS');
export const prevAction = _common(PREFIX_URL + '/page/', 'PREV_USERS');
export const nextAction = _common(PREFIX_URL + '/page/', 'NEXT_USERS');

export const getTotal = () => dispatch => {
  return fetch('/api/list/total')
    .then(res => res.json())
    .then(
      (data) => dispatch({type: 'FETCH_TOTAL', payload: data}),
      (error) => dispatch({type: 'FETCH_TOTAL_FAIL', error})
    );
}

/** deprecated:
 export const getUsers = (page = 1) => dispatch => {
  return fetch(`/api/list/page/${page}`, {
    method: 'GET',
    headers: {"Content-type": "application/json","Accept": "application/json"}
  })
    .then(res => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        dispatch({type: 'FETCH_USERS',payload: data});
      }
      else {
        dispatch({type: 'FETCH_USERS_FAIL',payload: data});
      }
    });
};*/

export const searchUsers = keyword => dispatch => {
  return fetch(`/api/list/search/${keyword}`)
    .then(res => res.json())
    .then(
      (data) => dispatch({type: 'SEARCH_USERS', payload: data}),
      (error) => dispatch({type: 'SEARCH_USERS_FAIL', error}))
}

export const updateUser = user => dispatch => {
  fetch('/api/list', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(
      (data) => dispatch({type: 'UPDATE_USER', payload: data}),
      (error) => dispatch({type: 'UPDATE_USER_FAIL', error}))
};

export const saveUser = user => dispatch => {
  return fetch('/api/list', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(
      (data) => dispatch({type: 'ADD_USER', payload: data}),
      (error) => dispatch({type: 'ADD_USER_FAIL', error}))
}

export const deleteUser = user => dispatch => {
  return fetch('/api/list', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      // case: 204 No Content
      // res.status is integer, not string.
      if (res.status === 204 && res.statusText === "No Content") return 'successful'
      return res.json()
    })
    .then(
      (data) => dispatch({type: 'DELETE_USER', payload: user}),
      (error) => dispatch({type: 'DELETE_USER_FAIL', error}));
}

export const sortAction = (sortBy, seq) => ({
  type: 'SORT_USERS',
  sortBy: sortBy,
  seq: seq
})
