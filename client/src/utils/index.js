import React, {Fragment} from 'react'

export const loadingDefer = ms => {
  const promise = new Promise((resolve, reject) => {
    ms = ms || 2000; //default is 2 seconds
    setTimeout(() => resolve('user-login'), ms);
  })
  return promise;
}

export const isEmpty = prop => {
  return prop === null || prop === undefined ||
    (prop.hasOwnProperty("length") && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
}

export const displayInfo = (h3, p) => (
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <Fragment>{h3}</Fragment>
      <Fragment>{p}</Fragment>
    </div>
  </div>
)

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


export const filterData = (state, items) => {
  if (Array.isArray(items)) {
    let ss = {}
    items.forEach(item => (ss[item] = state[item]))
    ss['loggedIn'] = state.loggedIn
    return ss;
  }
  else {
    return {[items]: state[items], loggedIn: state.loggedIn}
  }
}

export const displayReduxData = data => {
  let displayData = null;
  if (Array.isArray(data)) {
    displayData = data.reduce((memo, d, i) => {
      memo.push(
        <code key={`d${i}`}>
          {JSON.stringify(d, null, 2)}
        </code>
      )
      return memo;
    }, [])
  }
  else {
    displayData = (
      <code>
        {JSON.stringify(data, null, 2)}
      </code>
    )
  }
  return (
    <blockquote>
            <pre>
                {displayData}
            </pre>
    </blockquote>
  )
}