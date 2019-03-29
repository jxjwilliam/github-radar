import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import {searchAction, headerAction} from '../actions'
import {searchGithub, sortGithub} from '../actions/GithubAction'
import {searchFields} from '../reducers/'
import Searchbox from './Search'
import YearMenu from '../components/YearMenu'
import {SortAsc, SortDesc, FieldSearch, RouteWithSubRoutes} from '../utils'
import {GithubCategories, getSubRoutes} from '../config';

const HMenu = () => {
  var hlist = GithubCategories.map((gs, i) => (
      <NavLink key={`${gs[0]}-{i}`} to={gs[1]} title={gs[0]}>
        {gs[0]}{" | "}
      </NavLink>
    )
  )
  return (
    <div className="grid s-btn-group js-filter-btn">
      {hlist}
    </div>
  )
}

// number-field don't need `FieldSearch`. e.g. Forks, Stars.
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

const THeader = ({sort, onSearch}) => {
  let hlist = HFields.map((hf, inx) => (
    <th key={`hf-${inx}`}>
      <label>{hf[0]}</label>
      <SortAsc sort={sort} name={hf[1]}/>
      <SortDesc sort={sort} name={hf[1]}/>
      {hf[2] ? null : <FieldSearch onSearch={onSearch} name={hf[1]}/>}
    </th>
  ));
  return (
    <thead>
    <tr>
      <th scope="row">#</th>
      {hlist}
    </tr>
    </thead>
  )
}


const Detail = ({idx, item}) => {
  const {
    created, updated, name, forks, stars, size, url, desc,
    fname, watchers, issues, language
  } = item;
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{name}</td>
      <td><a href={url}>{fname}</a></td>
      <td>{desc}</td>
      <td>{language}</td>
      <td>{stars}</td>
      <td>{forks}</td>
      <td>{issues}</td>
      <td>{watchers}</td>
      <td>{size}</td>
      <td>{created.replace(/[A-Z].+$/, '')}</td>
      <td>{updated.replace(/[A-Z].+$/, '')}</td>
    </tr>
  )
}

class Github extends Component {
  state = {
    search_value: '',
    search_field: '',
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
      this.setState({search_value: keyword.trim().toLowerCase(), search_field: field})
    }
    else {
      this.setState({search_value: '', search_field: field})
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
    const routes = getSubRoutes(1);

    const {githubList, sortGithub} = this.props;
    const {search_value, search_field} = this.state;
    let list = [], total_idx = 0;
    if (search_field && search_value) {
      list = searchFields(githubList, search_field, search_value) || [];
    }
    else {
      list = githubList || [];
      total_idx = githubList.length;
    }

    return (
      <div className="container" style={{paddingTop: 48}}>
        <div className="row">
          <HMenu />
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
        <YearMenu nav="github"/>
        <div className="row">
          { routes.map((route, i) => (
            <RouteWithSubRoutes key={`github-${i}`} {...route}/>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    githubList: state.githubList,
    search: state.search
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