import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as ListAction from '../../store/actions';
import Searchbox from '../Search';
import SearchPageNavigator from './SearchPageNavigator';

export class Chart extends Component {
    state = {
      done: false
    };

    handleGlobalSearch = value => {
      this.props.searchUsers(value)
        .then(() => this.setState({ done: true }));
    }

    render () {
      return (
          <div className="container" style={ { paddingTop: 48 } }>
              <div className="row">
                  <div className="col-md-10">
                      <SearchPageNavigator />
                      <Searchbox onChange={ this.handleGlobalSearch }/>
                  </div>
              </div>
              <div className="row" style={ { paddingTop: 10 } }>
                  CHART { this.props.userList.length }
              </div>
          </div>
      );
    }
}

Chart.propTypes = {
  userList: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  searchUsers: PropTypes.func.isRequired
};

Chart.defaultProps = {
  userList: [],
  /* eslint-disable no-console */
  searchUsers: () => { console.error('function is not provided'); }
};

const mapStateToProps = (state) => {
  return {
    userList: state.userList
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ListAction, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);
