import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom'

/**
 * <Route path="/user/:username" component={User} />;
 * function User({ match }) {
 *   return <h1>Hello {match.params.username}!</h1>;
 * }
 * match.params.year = /:year
 */
const Year_v1 = ({nav}) => {
  var ylist = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'].map((y, i) => (
    <li key={`${y}-${i}`}>
      <NavLink exact to={`/${nav}/${y}`} title={y} activeStyle={{
        fontweight: "bold",
        color: "red"
      }}>{y}</NavLink>
    </li>
  ))

  return (
    <div style={{position: "static"}}>
      <ul>
        {ylist}
      </ul>
    </div>
  )
}

// TODO: how to validate the range is latest 10 years?
const YearMenu = ({match}) => {
  <Fragment>
    <h1>{match.params.year}</h1>
  </Fragment>
}

export default YearMenu;