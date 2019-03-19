export const searchAction = ({placeholder, selectors}) => ({
  type: 'CHANGE_SEARCH_CRITERIA',
  payload: {
    placeholder: placeholder,
    selectors: selectors
  }
})

export const headerAction = title => ({
  type: 'CHANGE_TITLE',
  payload: title
})