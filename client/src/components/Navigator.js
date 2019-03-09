import React from 'react';
import {NavLink} from 'react-router-dom'

const Navigator = () => (
  <React.Fragment>
    <div style={{float: "right", marginRight: "30px"}}>
      <NavLink exact activeStyle={{color: 'green'}} to="/list">List
        <i className="fa fa-user"></i>
      </NavLink>{" | "}
      <NavLink exact activeStyle={{color: 'green'}} to="/about">Trends Radar
        <i className="fa fa-sign-in"></i>
      </NavLink>{" | "}
      <NavLink exact activeStyle={{color: 'green'}} to="/contact">Aggregation
        <i className="fa fa-sign-out"></i>
      </NavLink>
    </div>
  </React.Fragment>
);

export default Navigator
