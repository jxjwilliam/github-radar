import React from 'react';
import {connect} from 'react-redux';
import {headerAction} from '../actions/'

const Header = props => {
  const title = props.title || 'GitHub/Stackoverflow/MSDN Radar/Trends POC';
  return (
    <React.Fragment>
      <h1>{title}</h1>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  title: state.title
})

export default connect(mapStateToProps, {headerAction})(Header)