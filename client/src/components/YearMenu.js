import React from 'react';
import {NavLink} from 'react-router-dom'

const Years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];

const YearMenu = nav => {
    var ylist = Years.map((y,i) => (
        <li>
            <NavLink to={`/${nav}/${y}`} activeStyle={{
                fontweight: "bold",
                color: "red"
            }}>{y}</NavLink>
        </li>
    ))
    
    return (
        <div class="profile-timeline-year-list js-profile-timeline-year-list bg-white js-sticky float-right col-2 pl-5" style="position: static;">
            <ul class="filter-list small">
                {ylist}
            </ul>
        </div>
    )
}

export default YearMenu;