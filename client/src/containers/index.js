import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ListAction from '../actions/';
import { searchFields } from '../reducers/';
import Searchbox from '../components/Search';

const SortAsc = ({ sort, name }) => (
    <button
      type="button"
      title={ 'sort by ' + name }
      className="link-button"
      onClick={ () => sort(name, 'asc') }>
        <i className="fa fa-sort-up fa-lg"></i>
    </button>
);
const SortDesc = ({ sort, name }) => (
    <button
      type="button"
      title={ 'sort by ' + name + ' desc' }
      className="link-button"
      onClick={ () => sort(name, 'desc') }>
        <i className="fa fa-sort-down fa-lg"></i>
    </button>
);

let FieldSearch = ({ name, onSearch }) => (
    <div className="input-group">
        <input
          type="search"
          className="form-control"
          placeholder={ name }
          name="field_search"
          title="search in this page"
          onChange={ e => onSearch(e, name) }
        />
    </div>
);
FieldSearch = connect(
  state => ({ userList: state.userList })
)(FieldSearch);

const Header = ({ sort, onSearch }) => (
    <thead>
        <tr>
            <th scope="row">#</th>
            <th><label>Name</label>
                <SortAsc sort={ sort } name="name"/>
                <SortDesc sort={ sort } name="name"/>
                <FieldSearch onSearch={ onSearch } name="name"/>
            </th>
            <th><label>URL</label>
                <SortAsc sort={ sort } name="url"/>
                <SortDesc sort={ sort } name="url"/>
                <FieldSearch onSearch={ onSearch } name="url"/>
            </th>
            <th><label>Description</label>
                <SortAsc sort={ sort } name="desc"/>
                <SortDesc sort={ sort } name="desc"/>
                <FieldSearch onSearch={ onSearch } name="desc"/>
            </th>
            <th><label>Stars</label>
                <SortAsc sort={ sort } name="stars"/>
                <SortDesc sort={ sort } name="stars"/>
            </th>
            <th><label>Forks</label>
                <SortAsc sort={ sort } name="forks"/>
                <SortDesc sort={ sort } name="forks"/>
            </th>
            <th><label>Size</label>
                <SortAsc sort={ sort } name="size"/>
                <SortDesc sort={ sort } name="size"/>
            </th>
            <th><label>Created</label>
                <SortAsc sort={ sort } name="created"/>
                <SortDesc sort={ sort } name="created"/>
                <FieldSearch onSearch={ onSearch } name="created"/>
            </th>
            <th><label>Updated</label>
                <SortAsc sort={ sort } name="updated"/>
                <SortDesc sort={ sort } name="updated"/>
                <FieldSearch onSearch={ onSearch } name="updated"/>
            </th>
        </tr>
    </thead>
);

const Detail = ({ idx, item, onEdit, onDelete }) => {
  const { created, updated, name, forks, stars, size, url, desc } = item;
  return (
      <tr>
          <td>{idx + 1}</td>
          <td>{name}</td>
          <td>{url}</td>
          <td>{desc}</td>
          <td>{stars}</td>
          <td>{forks}</td>
          <td>{size}</td>
          <td>{created}</td>
          <td>{updated}</td>
      </tr>
  );
};

class List extends Component {
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
      total_idx = userList.length;
    }

    return (
        <div className="container" style={ { paddingTop: 48 } }>
            <div className="row">
                <div className="col-md-10">
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

const mapStateToProps = (state, ownProps) => {
  return {
    userList: state.userList,
    total: state.total
  };
};

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators(ListAction, dispatch);
  return { ...actions, dispatch };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
