import React, {Component} from 'react';
import {isEmpty} from '../utils'

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