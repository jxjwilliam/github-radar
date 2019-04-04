import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {headerAction} from '../actions/'

const Header = props => {
  const title = props.title || 'Trends / Radar / Forcast AI POC';
  return (
    <Fragment>
      <h1>{title}</h1>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({title: state.title})

export default connect(mapStateToProps, {headerAction})(Header)