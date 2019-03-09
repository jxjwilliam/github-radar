//1. Action creators
export const addReposAction = jsonResult => ({
  type: "ADD_TWEETS",
  repos: jsonResult
});

export const userChangedAction = value => ({
  type: "USER_CHANGED",
  value: value
});

export const loadingChangedAction = isLoading =>({
  type: "IS_LOADING",
  isLoading: isLoading
});

/**
 * 1. dispatch({type: FETCH_RESOURCES});
 * 2. http-promise
 * 3. then: dispatch({type: FETCH_RESOURCES_SUCCESS, data: res.body}
 * 4. catch:  dispatch({type: FETCH_RESOURCES_FAIL});
 *        can dispatch more: the generic "global errors" action
 * @param user
 * @returns {Function}
 */
export const loadReposAction = user => dispatch => {
    const url = '/api/delegate/github/' + user;
    const headers = {
      "Content-type": "application/json",
      "Accept": "application/json",
    }
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
      })
  }