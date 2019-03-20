import orderBy from 'lodash/orderBy'

const stackoverflowReducer = (state = [], action) => {
  switch (action.type) {
    case 'SORT_SOF':
      return orderBy(state, [action.sortBy], [action.seq]);
    case 'SEARCH_SOF':
      if (Array.isArray(action.payload.items)) {
        return action.payload.items.reduce((arr, item) => {
          arr.push({
            'tags': item['tags'].join(','),
            'score': item['score'],
            'views': item['view_count'],
            'answers': item['answer_count'],
            'url': item['link'],
            'desc': item['title'],
            'created': new Date(item['creation_data']).toLocaleDateString("en-US"),
            'updated': new Date(item['last_edit_date']).toLocaleDateString("en-US")
          });
          return arr;
        }, []);
      }
      return action.payload;
    case 'SEARCH_SOF_FAIL':
      return action.error;
    default:
      return state;
  }
}

export default stackoverflowReducer