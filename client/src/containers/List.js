import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {areEqualShallow, isEmpty} from '../utils'
import * as ListAction from '../actions/listAction'
import {searchFields} from '../reducers/listReducer'
import Searchbox from '../components/Search'
//import ModalForm from '../components/ModalForm'
import ModalForm from '../components/Modal1'

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
  state => ({userList: state.userList}),
  {getUsers: ListAction.getUsers}
)(FieldSearch)

const Header = ({sort, onSearch}) => (
  <thead>
  <tr>
    <th scope="row">#</th>
    <th><label>First Name</label>
      <SortAsc sort={sort} name="firstName"/>
      <SortDesc sort={sort} name="firstName"/>
      <FieldSearch onSearch={onSearch} name="firstName"/>
    </th>
    <th><label>Last Name</label>
      <SortAsc sort={sort} name="lastName"/>
      <SortDesc sort={sort} name="lastName"/>
      <FieldSearch onSearch={onSearch} name="lastName"/>
    </th>
    <th><label>Email</label>
      <SortAsc sort={sort} name="email"/>
      <SortDesc sort={sort} name="email"/>
      <FieldSearch onSearch={onSearch} name="email"/>
    </th>
    <th><label>Team</label>
      <SortAsc sort={sort} name="team"/>
      <SortDesc sort={sort} name="team"/>
      <FieldSearch onSearch={onSearch} name="team"/>
    </th>
    <th><label>Role</label>
      <SortAsc sort={sort} name="role"/>
      <SortDesc sort={sort} name="role"/>
      <FieldSearch onSearch={onSearch} name="role"/>
    </th>
    <th><label>Location</label>
      <SortAsc sort={sort} name="location"/>
      <SortDesc sort={sort} name="location"/>
      <FieldSearch onSearch={onSearch} name="location"/>
    </th>
    <th><label>Comment</label>
      <SortAsc sort={sort} name="comment"/>
      <SortDesc sort={sort} name="comment"/>
      <FieldSearch onSearch={onSearch} name="comment"/>
    </th>
    <th><label>TS</label>
      <SortAsc sort={sort} name="timestamp"/>
      <SortDesc sort={sort} name="timestamp"/>
      <FieldSearch onSearch={onSearch} name="timestamp"/>
    </th>
    <th>Operation</th>
  </tr>
  </thead>
)

/**
 * user.firstName, userLastName could be undefined? email is mandatory and unique.
 */
const Detail = ({idx, user, onEdit, onDelete}) => {
  const {firstName, lastName, email} = user;
  let info = (firstName && lastName) ? firstName + ' ' + lastName : email;
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>
        <button onClick={() => onEdit(user._id)}>{email}</button>
      </td>
      <td>{user.team.join(', ')}</td>
      <td>{user.role}</td>
      <td>{user.location}</td>
      <td>{user.comment}</td>
      <td>{user.timestamp.slice(0, 10).replace(/-/g, '/')}</td>
      <td>
        <button
          className="btn btn-warning"
          onClick={() => onEdit(user._id)}
          title={`eidt ${info}`}
        >
          <i className="fa fa-edit"></i>
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(user._id)}
          title={`remove  ${info}`}
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  )
}

class List extends Component {
  state = {
    showModal: false,
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

  open = () => {
    this.setState({showModal: true});
  }

  close = () => {
    this.setState({showModal: false, user: {}});
  }

  doUser = values => {
    if (areEqualShallow(values, this.state.user)) {
      console.log('doUser - nothing change: values === this.state.user');
      this.setState({showModal: false, user: {}});
      return false;
    }

    if (Object.keys(this.state.user).length === 0) {
      this.props.saveUser(values);
    }
    else {
      //var newUser = Object.assign(this.state.user, values); //this.props.modelform
      this.props.updateUser(values);
    }
    this.setState({showModal: false, user: {}})
  }

  editModal = id => {
    let theUser = this.props.userList.find(user => user._id === id);
    this.setState({user: theUser, showModal: true});
  }


  //this.props.total={total: 7, limit: 6}
  updateTotal = () => {
    const {total, limit} = this.props.total;
    this.setState({
      total_users: total,
      total_page: Math.ceil(total / limit)
    })
  }

  displayInfo(fname, lname, email) {
    return (fname && lname) ? fname + ' ' + lname : email;
  }

  /** when delete, not pass the whole user object as body, only need _id, email. */
  deleteModal = id => {
    let theUser = this.props.userList.find(user => user._id === id);
    let info = this.displayInfo(theUser.firstName, theUser.lastName, theUser.email);
    if (window.confirm('Are you sure to delete ' + info + '?')) {
      this.props.deleteUser({id: theUser._id, email: theUser.email})
        .then(this.props.getTotal)
        .then(this.updateTotal);
    }
  }

  componentDidMount() {
    this.props.getUsers(1)

    this.props.getTotal()
      .then(this.updateTotal)
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
    // if value is not empty, then do ajax call.
    if (value) {
      this.props.searchUsers(value)
        .then(() => this.setState({done: true}));
    }
    // otherwise, reset to original page.
    else {
      this.props.getUsers(this.state.curr_page);
    }
  }

  render() {
    const {userList, sortAction} = this.props;
    const {search_value, search_field} = this.state;
    let list = [], total_idx = 0;
    if (search_field && search_value) {
      list = searchFields(userList, search_field, search_value);
    }
    else {
      list = userList;
      const limit = this.props.total.limit ? this.props.total.limit : 6;
      total_idx = (this.state.curr_page - 1) * limit;
    }

    return (
      isEmpty(userList) && !this.state.done
        ? <div className="loader"/> : (
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
                {list.map((user, i) => (
                  <Detail
                    key={i + total_idx}
                    onEdit={this.editModal}
                    onDelete={this.deleteModal}
                    user={user}
                    idx={i + total_idx}
                  />
                ))}
                </tbody>
              </table>
            </div>
            <div className="modal-123">
              <ModalForm
                show={this.state.showModal}
                close={this.close}
                onUpdate={this.doUser}
                user={this.state.user}/>
            </div>
          </div>
        ))
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