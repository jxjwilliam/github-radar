import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ListAction from '../../store/actions';
import { searchFields } from '../../store/reducers';
import Searchbox from '../Search';
import SearchPageNavigator from './SearchPageNavigator';
import { Header } from '../../containers/SearchPage';
import { Detail } from '../../containers/SearchPage';

export class List extends Component {
    state = {
      total_page: 1,
      total_users: 0,
      search_value: '',
      search_field: '',
      done: false
    };

    handleSearch = (e, field) => {
      let keyword = e.target.value;
      if (keyword) {
        this.setState({ search_value: keyword.trim().toLowerCase(), search_field: field });
      } else {
        this.setState({ search_value: '', search_field: '' });
      }
      e.preventDefault();
    }

    handleGlobalSearch = value => {
      this.props.searchUsers(value)
        .then(() => this.setState({ done: true }));
    }

    render () {
      const { userList, sortAction } = this.props;
      const { search_value, search_field } = this.state;
      let list = []; let total_idx = 0;
      if (search_field && search_value) {
        list = searchFields(userList, search_field, search_value) || [];
      } else {
        list = userList || [];
        total_idx = list.length;
      }

      return (
          <div className="container" style={ { paddingTop: 48 } }>
              <div className="row">
                  <div className="col-md-10">
                      <SearchPageNavigator />
                      <Searchbox onChange={ this.handleGlobalSearch }/>
                  </div>
              </div>
              <div className="row" style={ { paddingTop: 10 } }>
                  <table className="table table-bordered">
                      <Header sort={ sortAction } onSearch={ this.handleSearch }/>
                      <tbody>
                          {Array.isArray(list) && list.map((item, i) => (
                              <Detail
                                key={ i + total_idx }
                                item={ item }
                                idx={ i }
                              />
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList,
    total: state.total
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ListAction, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
