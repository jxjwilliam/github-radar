import React from 'react';
import {NavLink} from 'react-router-dom'

const Navigator = () => (
  <React.Fragment>
    <div style={{float: "right", marginRight: "30px"}}>
      <NavLink exact activeStyle={{color: 'green'}} to="/list">Github
        <i className="fa fa-user"></i>
      </NavLink>{" | "}
      <NavLink exact activeStyle={{color: 'green'}} to="/stackoverflow">Stackoverflow
        <i className="fa fa-sign-in"></i>
      </NavLink>{" | "}
      <NavLink exact activeStyle={{color: 'green'}} to="/msdn">MSDN
        <i className="fa fa-sign-out"></i>
      </NavLink>{" | "}
      <NavLink exact activeStyle={{color: 'green'}} to="/youtube">Youtube
        <i className="fa fa-sign-out"></i>
      </NavLink>{" | "}
      {/*<NavLink exact activeStyle={{color: 'green'}} to="/channel9">Channel9*/}
        {/*<i className="fa fa-sign-in"></i>*/}
      {/*</NavLink>{" | "}*/}
      <NavLink exact activeStyle={{color: 'green'}} to="/about">About
        <i className="fa fa-sign-in"></i>
      </NavLink>
    </div>
  </React.Fragment>
);

export default Navigator
