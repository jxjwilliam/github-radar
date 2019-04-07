import React, {Fragment, Component} from 'react'
import {Route} from 'react-router-dom'

export const loadingDefer = ms => {
  const promise = new Promise((resolve, reject) => {
    ms = ms || 2000; //default is 2 seconds
    setTimeout(() => resolve('trends-forcast-recommendation'), ms);
  })
  return promise;
}

export const isEmpty = prop => {
  return prop === null || prop === undefined ||
    (prop.hasOwnProperty("length") && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
}

export const SortAsc = ({sort, name}) => (
  <button
    type="button"
    title={'sort by ' + name}
    className="link-button"
    onClick={() => sort(name, 'asc')}>
    <i className="fa fa-sort-up fa-lg"></i>
  </button>
)

export const SortDesc = ({sort, name}) => (
  <button
    type="button"
    title={'sort by ' + name + ' desc'}
    className="link-button"
    onClick={() => sort(name, 'desc')}>
    <i className="fa fa-sort-down fa-lg"></i>
  </button>
)

export const FieldSearch = ({name, onSearch}) => (
  <div className="input-group">
    <input
      type="search"
      className="form-control"
      placeholder={name}
      name="field_search"
      title="search in this page"
      onChange={e => onSearch(e, name)}
    />
  </div>
)

export const THeader = ListFields => ({sort, onSearch}) => {
  let hlist = ListFields.map((hf, inx) => (
    <th key={`hf-${inx}`}>
      <label>{hf[0]}</label>
      <SortAsc sort={sort} name={hf[1]}/>
      <SortDesc sort={sort} name={hf[1]}/>
      {hf[2] ? null : <FieldSearch onSearch={onSearch} name={hf[1]}/>}
    </th>
  ));
  return (
    <thead>
    <tr>
      <th scope="row">#</th>
      {hlist}
    </tr>
    </thead>
  )
}

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}
    />
  )
}

export const getSelector = ary => ({title, handler}) => (
  <select onChange={handler}>
    <option value="">{title}</option>
    {ary.map((key, index) => (
      <option key={`${key[0]}-${index}`} value={key[1]}>
        {key[0]}
      </option>
    ))}
  </select>
)


const HEADERS = {
  "Content-type": "application/json",
  "Accept": "application/json",
}

export const fetching = (url, opts={}) => {

  var headers = {...HEADERS, ...opts.headers}
  var method = opts.method ? opts.method : 'GET'

  return fetch(url, {
    method: method,
    headers: headers
  })
}

export const Loading = loadingProp => WrappedComponent => {
  return class Loading extends Component {
    render() {
      return isEmpty(this.props[loadingProp])
        ? <Fragment>
          <div className="loader"/>
        </Fragment>
        : <WrappedComponent {...this.props}/>;
    }
  }
}

export const areEqualShallow = (a, b) => {
  for (let key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  for (let key in b) {
    if (!(key in a)) {
      return false;
    }
  }
  return true;
}