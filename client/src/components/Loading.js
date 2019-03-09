import React, {Component} from 'react';
import {isEmpty} from '../utils'

const isEmpty = prop => {
  return prop === null || prop === undefined ||
    (prop.hasOwnProperty("length") && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
}

const Loading = loadingProp => WrappedComponent => {
  return class Loading extends Component {
    render() {
      return isEmpty(this.props[loadingProp])
        ? <div className="loader"/>
        : <WrappedComponent {...this.props}/>;
    }
  }
}


export default Loading;