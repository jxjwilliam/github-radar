import React from 'react';
import { NavLink } from 'react-router-dom';

const SearchPageNavigator = () => (
    <React.Fragment>
        <div style={ { float: 'right' } }>
            <NavLink exact activeStyle={ { color: 'green' } } to="/search/list"> List
                <i className="fa fa-list-ul"></i>
            </NavLink>{' | '}
            <NavLink activeStyle={ { color: 'green' } } to="/search/chart"> Chart
                <i className="fas fa-chart-bar"></i>
            </NavLink>
        </div>
    </React.Fragment>
);

export default SearchPageNavigator;
