import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchAction, headerAction} from '../actions'
import {searchSOF, sortSOF} from '../actions/StackoverflowAction'
import {searchFields} from '../reducers/'
import Searchbox from './Search'
import {SortAsc, SortDesc, FieldSearch} from '../utils'

const HFields = [];

const THeader = ({sort, onSearch}) => {
  let hlist = HFields.map((hf, inx) => (
    <th key={`hf-${inx}`}>
      <label>{hf[0]}</label>
      <SortAsc sort={sort} name={hf[1]}/>
      <SortDesc sort={sort} name={hf[1]}/>
      <FieldSearch onSearch={onSearch} name={hf[1]}/>
    </th>
  ))
  return (
    <thead>
    <tr>
      <th scope="row">#</th>
      {hlist}
    </tr>
    </thead>
  )
}

const Detail = ({idx, item, onEdit, onDelete}) => {
  const {created, updated, name, forks, stars, size, url, desc} = item;
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
  )
}

class Stackoverflow extends Component {
  state = {
    search_value: '',
    search_field: '',
    done: true,
    title: 'Stackoverflow'
  };

  componentDidMount() {
    this.props.headerAction(this.state.title);
    this.props.searchAction({
      placeholder: this.state.title,
      selectors: 3
    });
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

  handleGlobalSearch = data => {
    setTimeout(() => {
      this.setState({done: false});
    }, 0);
    this.props.searchSOF(data)
      .then(() => this.setState({done: true}));
  }

  render() {
    const {sofList, sortSOF} = this.props;
    const {search_value, search_field} = this.state;
    let list = [], total_idx = 0;
    if (search_field && search_value) {
      list = searchFields(sofList, search_field, search_value) || [];
    }
    else {
      list = sofList || [];
      total_idx = sofList.length;
    }

    return (
      <div className="container" style={{paddingTop: 48}}>
        <div className="row">
          <div className="col-md-10">
            <Searchbox onChange={this.handleGlobalSearch}/>
          </div>
        </div>
        { !this.state.done ? <div className="loader"/> : (
            <div className="row" style={{paddingTop: 10}}>
              <table className="table table-bordered">
                <THeader sort={sortSOF} onSearch={this.handleSearch}/>
                <tbody>
                {Array.isArray(list) && list.map((item, i) => (
                  <Detail
                    key={i + total_idx}
                    item={item}
                    idx={i}
                  />
                ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sofList: state.sofList,
    search: state.search
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({
    searchSOF,
    sortSOF,
    searchAction,
    headerAction
  }, dispatch);
  return {...actions, dispatch};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stackoverflow);