import orderBy from 'lodash/orderBy'

function objToString (obj) {
  var str = '';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += p + ':' + obj[p] + '\r\n';
    }
  }
  return str;
}

const msdnReducer = (state = [], action) => {
  switch (action.type) {
    case 'SORT_MSDN':
      return orderBy(state, [action.sortBy], [action.seq]);
    case 'SEARCH_MSDN':
      if (Array.isArray(action.payload.data)) {
        return action.payload.data.reduce((arr, item) => {
          arr.push({
            rating: objToString(item['rating']),
            score: item['searchScore'].toFixed(2),
            summary: item['summary'],
            tags: item['tags'].join(','),
            title: item['title'],
            type: item['type'],
            url: "https://channel9.msdn.com" + item['url'],
            views: objToString(item['views']),
            created: item['published'].replace(/[A-Z].+$/, ''),
            updated: item['modified'].replace(/[A-Z].+$/, ''),
          });
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

export default msdnReducer;