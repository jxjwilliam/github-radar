import orderBy from 'lodash/orderBy'

const epamReducer = (state = [], action) => {
  switch (action.type) {
    case 'SORT_EPAM':
      return orderBy(state, [action.sortBy], [action.seq]);
    case 'SEARCH_EPAM':
      if (Array.isArray(action.payload.data)) {
        return action.payload.data.reduce((arr, item) => {
          arr.push({
            created: item['published'].replace(/[A-Z].+$/, ''),
            updated: item['modified'].replace(/[A-Z].+$/, ''),
          });
          return arr;
        }, []);
      }
      return action.payload;
    case 'SEARCH_EPAM_FAIL':
      return action.error;
    default:
      return state;
  }
}

export default epamReducer;