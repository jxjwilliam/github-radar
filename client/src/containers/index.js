import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isEmpty} from '../utils'
import * as ListAction from '../actions/'
import {searchFields} from '../reducers/'
import Searchbox from '../components/Search'

const SortAsc = ({sort, name}) => (
  <button
    type="button"
    title={'sort by ' + name}
    className="link-button"
    onClick={() => sort(name, 'asc')}>
    <i className="fa fa-sort-up fa-lg"></i>
  </button>
)
const SortDesc = ({sort, name}) => (
  <button
    type="button"
    title={'sort by ' + name + ' desc'}
    className="link-button"
    onClick={() => sort(name, 'desc')}>
    <i className="fa fa-sort-down fa-lg"></i>
  </button>
)


let FieldSearch = ({name, onSearch}) => (
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
FieldSearch = connect(
  state => ({userList: state.userList})
)(FieldSearch)

const Header = ({sort, onSearch}) => (
  <thead>
  <tr>
    <th scope="row">#</th>
    <th><label>Name</label>
      <SortAsc sort={sort} name="name"/>
      <SortDesc sort={sort} name="name"/>
      <FieldSearch onSearch={onSearch} name="name"/>
    </th>
    <th><label>Stars</label>
      <SortAsc sort={sort} name="stars"/>
      <SortDesc sort={sort} name="stars"/>
      <FieldSearch onSearch={onSearch} name="stars"/>
    </th>
    <th><label>Forks</label>
      <SortAsc sort={sort} name="forks"/>
      <SortDesc sort={sort} name="forks"/>
      <FieldSearch onSearch={onSearch} name="forks"/>
    </th>
    <th><label>Size</label>
      <SortAsc sort={sort} name="size"/>
      <SortDesc sort={sort} name="size"/>
      <FieldSearch onSearch={onSearch} name="size"/>
    </th>
    <th><label>Created</label>
      <SortAsc sort={sort} name="created"/>
      <SortDesc sort={sort} name="created"/>
      <FieldSearch onSearch={onSearch} name="created"/>
    </th>
    <th><label>Updated</label>
      <SortAsc sort={sort} name="updated"/>
      <SortDesc sort={sort} name="updated"/>
      <FieldSearch onSearch={onSearch} name="updated"/>
    </th>
  </tr>
  </thead>
)

const Detail = ({idx, item, onEdit, onDelete}) => {
  const {created, updated, name, forks, stars, size} = item;
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{name}</td>
      <td>{stars}</td>
      <td>{forks}</td>
      <td>{size}</td>
      <td>{created}</td>
      <td>{updated}</td>
    </tr>
  )
}

class List extends Component {
  state = {
    user: {},
    curr_page: 1,
    total_page: 1,
    total_users: 0,
    search_value: '',
    search_field: '',
    done: false
  };

  prev = () => {
    let page = this.state.curr_page;
    if (page > 1) {
      page = page - 1;
      this.setState({curr_page: page});
      this.props.prevAction(page)
    }
    else {
      console.log('current page: ' + page + ', cannot prev');
    }
  }

  next = () => {
    let page = this.state.curr_page;
    if (page < this.state.total_page) {
      page = page + 1;
      this.setState({curr_page: page});
      this.props.nextAction(page);
    }
    else {
      console.log('current page: ' + page + ', cannot next');
    }
  }

  updateTotal = () => {
    const {total, limit} = this.props.total;
    this.setState({
      total_users: total,
      total_page: Math.ceil(total / limit)
    })
  }

  handleSearch = (e, field) => {
    let keyword = e.target.value;
    if (keyword) {
      this.setState({search_value: keyword.trim().toLowerCase(), search_field: field})
    }
    else {
      this.setState({search_value: '', search_field: ''})
    }
    e.preventDefault();
  }

  handleGlobalSearch = value => {
    this.props.searchUsers(value)
      .then(() => this.setState({done: true}));
  }

  render() {
    const {userList, sortAction} = this.props;
    const {search_value, search_field} = this.state;
    let list = [], total_idx = 0;
    if (search_field && search_value) {
      list = searchFields(userList, search_field, search_value) || [];
    }
    else {
      list = userList || [];
      total_idx = userList.length;
    }

    return (
      <div className="container" style={{paddingTop: 48}}>
        <div className="row">
          <div className="col-md-5">
            <Searchbox onChange={this.handleGlobalSearch}/>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="link-button"
              aria-label="Previous"
              onClick={this.prev}>
              <i className="fa fa-backward">Prev</i>
            </button>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="link-button"
              aria-label="Next" onClick={this.next}>
              <i className="fa fa-forward">Next</i>
            </button>
          </div>
          <div>
                <span>
                  Page <strong>{this.state.curr_page}</strong> of <strong>{this.state.total_page}</strong>,
                  total <strong>{this.state.total_users}</strong> users
                </span>
          </div>
        </div>
        <div className="row" style={{paddingTop: 10}}>
          <table className="table table-bordered">
            <Header sort={sortAction} onSearch={this.handleSearch}/>
            <tbody>
            {Array.isArray(list) && list.map((item, i) => (
              <Detail
                key={i + total_idx}
                item={item}
                idx={i + total_idx}
              />
            ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userList: state.userList,
    total: state.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators(ListAction, dispatch);
  return {...actions, dispatch};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);