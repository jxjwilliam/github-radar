import {combineReducers} from 'redux'

import githubReducer from './GithubReducer'
import msdnReducer from './MsdnReducer'
import stackoverflowReducer from './StackoverflowReducer'

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_CRITERIA':
      return action.payload;
  }
  return state;
}

const headerReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_TITLE':
      return action.payload;
  }
  return state;
}

export default combineReducers({
  githubList: githubReducer,
  msdnList: msdnReducer,
  sofList: stackoverflowReducer,
  search: searchReducer,
  title: headerReducer
})