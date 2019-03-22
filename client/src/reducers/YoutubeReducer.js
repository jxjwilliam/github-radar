import orderBy from 'lodash/orderBy'

const youtubeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SORT_MSDN':
      return orderBy(state, [action.sortBy], [action.seq]);
    case 'SEARCH_MSDN':
      if (Array.isArray(action.payload.data)) {
        return action.payload.data.reduce((arr, item) => {
          arr.push({});
          return arr;
        }, []);
      }
      return action.payload;
    case 'SEARCH_MSDN_FAIL':
      return action.error;
    default:
      return state;
  }
}

export default youtubeReducer;