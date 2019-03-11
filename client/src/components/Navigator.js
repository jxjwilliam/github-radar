import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigator = () => (
    <React.Fragment>
        <div style={ { float: 'right', marginRight: '30px' } }>
            <NavLink exact activeStyle={ { color: 'green' } } to="/search/list">Search
                <i className="fa fa-user"></i>
            </NavLink>{' | '}
            <NavLink exact activeStyle={ { color: 'green' } } to="/about">About
                <i className="fa fa-sign-in"></i>
            </NavLink>{' | '}
            <NavLink exact activeStyle={ { color: 'green' } } to="/contact">Contact
                <i className="fa fa-sign-out"></i>
            </NavLink>
        </div>
    </React.Fragment>
);

export default Navigator;
