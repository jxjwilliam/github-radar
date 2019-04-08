import React, {Fragment, Component} from 'react'
import {Route, NavLink} from 'react-router-dom'

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

export const SearchField = ({name, onSearch}) => (
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


export const filterTableColumn = (state, keyword) => state.filter(ul => ul.toLowerCase().indexOf(keyword) !== -1)


export const getSubMenu = ary => {
  const smlist = ary.map((sm, i) => (
      <NavLink key={`${sm}-{i}`} to={sm} title={sm}>
        {sm}{" | "}
      </NavLink>
    )
  )
  return (
    <div className="grid smenu">
      {smlist}
    </div>
  )
}


export const getTHeader = ListFields => ({sort, onSearch}) => {
  const hlist = ListFields.map((hf, i) => (
    <th key={`hf-${i}`}>
      <label>{hf[0]}</label>
      <SortAsc sort={sort} name={hf[1]}/>
      <SortDesc sort={sort} name={hf[1]}/>
      {hf[2] ? null : <SearchField onSearch={onSearch} name={hf[1]}/>}
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

export function getSubRoutes(route) {
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

/**
 * <Route path="/user/:username" component={User} />;
 * function User({ match }) {
 *   return <h1>Hello {match.params.username}!</h1>;
 * }
 * match.params.year = /:year
 */
export const getYears = (total_year = 10) => nav => {
  let years = [];
  let max_year = new Date().getFullYear(), min_year = max_year - total_year;
  for (let i = max_year; i > min_year; i--) {
    years.push(i)
  }
  var ylist = years.map((y, i) => (
    <li key={`${y}-${i}`}>
      <NavLink exact to={`/${nav}/${y}`} title={y} activeStyle={{
        fontweight: "bold",
        color: "red"
      }}>{y}</NavLink>
    </li>
  ))

  return (
    <div style={{position: "static"}}>
      <ul>
        {ylist}
      </ul>
    </div>
  )
}

export const fetching = (url, opts = {}) => {
  const HEADERS = {
    "Content-type": "application/json",
    "Accept": "application/json",
  }

  const headers = {...HEADERS, ...opts.headers}
  const method = opts.method || 'GET'

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