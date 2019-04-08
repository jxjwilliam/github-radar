import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchAction, headerAction} from '../actions'
import {searchSOF, sortSOF} from '../actions/StackoverflowAction'
import Searchbox from './Search'
import {filterTableColumn, getSubMenu, getYears, getTHeader, getSubRoutes} from '../utils'
import {StackoverflowItems} from '../Routers'

const HFields = [
  ['Tags', 'tags'],
  ['URL', 'url'],
  ['Views', 'views', 'N'],
  ['Answers', 'answers', 'N'],
  ['Score', 'score', 'N'],
  ['Created', 'created'],
  ['Updated', 'updated']
];

const Detail = ({idx, item}) => {
  const {created, updated, tags, desc, score, views, answers, url} = item;
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{tags}</td>
      <td><a href={url} title={desc}>{desc}</a></td>
      <td>{views}</td>
      <td>{answers}</td>
      <td>{score}</td>
      <td>{created}</td>
      <td>{updated}</td>
    </tr>
  )
}

class Stackoverflow extends Component {
  state = {
    search_value: '',
    done: true,
    title: 'Stackoverflow',
    total: 0
  };

  componentDidMount() {
    this.props.headerAction(this.state.title);
    this.props.searchAction({
      placeholder: this.state.title,
      selectors: 2
    });
  }

  handleSearch = (e, field) => {
    let keyword = e.target.value;
    if (keyword) {
      this.setState({search_value: keyword.trim().toLowerCase()})
    }
    else {
      this.setState({search_value: ''})
    }
    e.preventDefault();
  }

  handleGlobalSearch = data => {
    setTimeout(() => {
      this.setState({done: false});
    }, 0);
    this.props.searchSOF(data)
      .then(ret => {
        let total = 0;
        try {
          total = ret.payload.quota_max + ret.payload.quota_remaining
        } catch (e) {
          total = 0;
        }
        this.setState({
          total: total,
          done: true
        })
      });
  }

  render() {
    const HMenu = getSubMenu(Object.keys(StackoverflowItems))
    const THeader = getTHeader(HFields)

    const routes = getSubRoutes(2);

    const {sofList, sortSOF} = this.props;
    const {search_value} = this.state;
    let list = [], total_idx = 0;
    if (search_value) {
      list = filterTableColumn(sofList, search_value);
      total_idx = list.length
    }
    else {
      list = sofList || [];
      total_idx = sofList.length;
    }

    return (
      <div className="container" style={{paddingTop: 48}}>
        <div className="row">
          {HMenu}
        </div>
        <div className="row">
          <div className="col-md-10">
            <Searchbox onChange={this.handleGlobalSearch}/>
          </div>
          <div className="col-md-2">
            {this.state.total ?
              <label className="alert alert-danger">total <code>{this.state.total}</code></label> : null}
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

        {getYears(8)}

        <div className="row">
          {/*{ routes.map((route, i) => (*/}
          {/*<getSubRoutes key={`stackoverflow-${i}`} {...route}/>*/}
          {/*))}*/}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  sofList: state.sofList,
  search: state.search
})

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