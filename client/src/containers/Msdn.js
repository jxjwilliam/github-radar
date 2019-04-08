import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchAction, headerAction} from '../actions/'
import {searchMSDN, sortMSDN} from '../actions/MsdnAction'
import Searchbox from './Search'
import {filterTableColumn, getSubMenu, getYears, getTHeader, getSubRoutes} from '../utils'
import {MsdnItems} from '../Routers'

const HFields = [
  ['Rating', 'rating'],
  ['Score', 'score'],
  ['Summary', 'summary'],
  ['Tags', 'tags'],
  ['Title', 'title'],
  ['Type', 'type'],
  ['Views', 'views'],
  ['Created', 'created'],
  ['Updated', 'updated']
];

const Detail = ({idx, item}) => {
  const {rating, score, summary, tags, title, type, url, views, created, updated} = item;
  return (
    <tr>
      <td>{idx + 1}</td>
      <td className="col-md-1">{rating}</td>
      <td>{score}</td>
      <td><a href={url} title={summary}>{summary}</a></td>
      <td className="col-md-1">{tags}</td>
      <td>{title}</td>
      <td>{type}</td>
      <td>{views}</td>
      <td>{created}</td>
      <td>{updated}</td>
    </tr>
  )
}

class Msdn extends Component {
  state = {
    search_value: '',
    done: true,
    title: 'MSDN',
    total: 0
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
    this.props.searchMSDN(data)
      .then(ret => this.setState({
        total: ret.payload.total,
        done: true
      }));
  }

  render() {

    const HMenu = getSubMenu(Object.keys(MsdnItems))
    const THeader = getTHeader(HFields)

    const {msdnList, sortMSDN} = this.props;
    const {search_value} = this.state;
    let list = [], total_idx = 0;
    if (search_value) {
      list = filterTableColumn(msdnList, search_value) || [];
      total_idx = list.length
    }
    else {
      list = msdnList || [];
      total_idx = msdnList.length;
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
                <THeader sort={sortMSDN} onSearch={this.handleSearch}/>
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

        {getYears(10)}

        <div className="row">
          {/*{ routes.map((route, i) => (*/}
            {/*<getSubRoutes key={`msdn-${i}`} {...route}/>*/}
          {/*))}*/}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  msdnList: state.msdnList,
  search: state.search
})

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({
    searchMSDN,
    sortMSDN,
    searchAction,
    headerAction
  }, dispatch);
  return {...actions, dispatch};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Msdn);