import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import moment from 'moment'
import {searchAction, headerAction} from '../actions'
import {searchGithub, sortGithub} from '../actions/GithubAction'
import Searchbox from './Search'
import {filterTableColumn, getSubMenu, getYears, getTHeader, getSubRoutes} from '../utils'
import {GithubItems} from '../Routers'

const HFields = [
  ['Name', 'name'],
  ['URL', 'url'],
  ['Description', 'desc'],
  ['Language', 'language'],
  ['Stars', 'stars', 'N'],
  ['Forks', 'forks', 'N'],
  ['Issues', 'issues', 'N'],
  ['Watchers', 'watchers', 'N'],
  ['Size', 'size', 'N'],
  ['Created', 'created'],
  ['Updated', 'updated']
]

const Detail = ({idx, item}) => {
  const {
    created, updated, name, forks, stars, size, url, desc, fname, watchers, issues, language
  } = item;
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{name}</td>
      <td><Link to={url}>{fname}</Link></td>
      <td>{desc}</td>
      <td>{language}</td>
      <td>{stars}</td>
      <td>{forks}</td>
      <td>{issues}</td>
      <td>{watchers}</td>
      <td>{size}</td>
      <td>{moment(created).format('YYYY-MM-DD')}</td>
      <td>{moment(updated).format('YYYY-MM-DD')}</td>
    </tr>
  )
}

class Github extends Component {
  state = {
    search_value: '',
    done: true,
    title: 'Github',
    total: 0
  };

  componentDidMount() {
    this.props.headerAction(this.state.title);
    this.props.searchAction({
      placeholder: this.state.title,
      selectors: 1
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

    this.props.searchGithub(data)
      .then(ret => this.setState({
        total: ret.payload.total_count,
        done: true
      }));
  }

  render() {

    const HMenu = getSubMenu(Object.keys(GithubItems))

    const THeader = getTHeader(HFields)

    //const routes = getSubRoutes(1);

    const {githubList, sortGithub} = this.props;
    const {search_value} = this.state;
    let list = [], total_idx = 0;
    if (search_value) {
      list = filterTableColumn(githubList, search_value) || [];
      total_idx = list.length
    }
    else {
      list = githubList;
      total_idx = githubList.length;
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
        {!this.state.done ? <div className="loader"/> : (
            <div className="row" style={{paddingTop: 10}}>
              <table className="table table-bordered">
                <THeader sort={sortGithub} onSearch={this.handleSearch}/>
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

        {getYears(12)}

        <div className="row">
          {/*{ routes.map((route, i) => (*/}
          {/*<getSubRoutes key={`github-${i}`} {...route}/>*/}
          {/*))}*/}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    githubList: state.githubList,
    total: state.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({
    searchGithub,
    sortGithub,
    searchAction,
    headerAction
  }, dispatch);
  return {...actions, dispatch};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Github);