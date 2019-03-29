import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom'
import {Years} from '../config'

const YearMenu = ({nav}) => {
  var ylist = Years.map((y, i) => (
    <li key={`${y.path}-${i}`}>
      <NavLink exact to={`/${nav}/${y.path}`} title={y.path} activeStyle={{
        fontweight: "bold",
        color: "red"
      }}>{y.path}</NavLink>
    </li>
  ))

  return (
    <div className="profile-timeline-year-list js-profile-timeline-year-list bg-white js-sticky float-right col-2 pl-5"
         style={{position: "static"}}>
      <ul className="filter-list small">
        {ylist}
      </ul>
    </div>
  )
}

export default YearMenu;