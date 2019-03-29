import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom'

const YearMenu = ({nav}) => {
  var ylist = ['2010', '2011', '2012', '2013', '2014'].map((y, i) => (
    <li key={`${y}-${i}`}>
      <NavLink exact to={`/${nav}/${y}`} title={y} activeStyle={{
        fontweight: "bold",
        color: "red"
      }}>{y}</NavLink>
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