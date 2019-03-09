import orderBy from 'lodash/orderBy'


const githubReducer = (state, action) => {
    let previousState = (state ? state : {user: "williamjxj",repos: [],isLoading:false});

    switch (action.type) {
        case "ADD_TWEETS":
            return addTweets(previousState, action);
            break;
        case "USER_CHANGED":
            return userChanged(previousState, action);
            break;
        case "IS_LOADING":
            return isLoadingChanged(previousState, action);
        default:
            return previousState;
    }
}


const totalReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TOTAL':
      return action.payload;
    case 'FETCH_TOTAL_FAIL':
      return action.error
    default:
      return state;
  }
}

const userListReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USERS':
    case 'LOAD_USERS':
    case 'PREV_USERS':
    case 'NEXT_USERS':
      return action.payload;
    case 'FETCH_USERS_FAIL':
    case 'LOAD_USERS_FAIL':
    case 'PREV_USERS_FAIL':
    case 'NEXT_USERS_FAIL':
      return action.error;
    case 'SORT_USERS':
      return orderBy(state, [action.sortBy], [action.seq]);
    case 'UPDATE_USER':
      return state.map(s => s._id === action.payload._id ? action.payload : s);
    //return [...state, action.payload]
    case 'UPDATE_USER_FAIL':
      return action.error;
    case 'ADD_USER':
      return [action.payload].concat(state)
    case 'DELETE_USER':
      console.log(action);
      return state.filter(s => s._id !== action.payload.id);
    case 'DELETE_USER_FAIL':
      console.error(action.error)
      return state;
    case 'SEARCH_USERS':
      return action.payload;
    case 'SEARCH_USERS_FAIL':
      return action.error;
    default:
      return state;
  }
}

// fix bugs for 'team' array: forth and back search works.
const searchFields = (state, field, keyword) => {
  if ('team' === field.toLowerCase()) {
    let teams = JSON.parse(JSON.stringify(state));
    teams.forEach(t => {
      let s = t.team.filter(st => {
        return st.toLowerCase().indexOf(keyword) !== -1
      })
      t.team = s;
    })
    return teams.filter(t => t.team.length > 0);
  }
  return state.filter(ul => ul[field] && ul[field].toLowerCase().indexOf(keyword) !== -1)
}

export {
  totalReducer,
  userListReducer,
  searchFields
}

export default githubReducer;