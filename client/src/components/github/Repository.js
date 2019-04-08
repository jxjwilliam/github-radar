import React, {Component, Fragment} from 'react'
import Demo1 from '../echarts/Demo1'

class Repository extends Component {

  // number-field don't need `SearchField`. e.g. Forks, Stars.
  state = {
    theader: [
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
  }

  detail = ({idx, item}) => {
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

  render() {
    let {match} = this.props;
    return (
      <Fragment>
        <h1>Repository</h1>
        {match.params}
        {match.path}
        {match.url}
        <Demo1/>
      </Fragment>
    )
  }
}

export default Repository;