import {combineReducers} from 'redux'

import githubReducer from './GithubReducer'
import msdnReducer from './MsdnReducer'
import stackoverflowReducer from './StackoverflowReducer'

export const searchFields = (state, field, keyword) => {
  return state.filter(ul => ul[field] && ul[field].toLowerCase().indexOf(keyword) !== -1)
}


export default combineReducers({
  githubList: githubReducer,
  msdnList: msdnReducer,
  sofList: stackoverflowReducer
})