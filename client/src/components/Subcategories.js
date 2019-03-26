import React from 'react'
import {NavLink} from 'react-router-dom'

const Menu = {
    'github': ['repositories', 'topics', 'commits'],
    'stackoverflow': ['hottest', 'latest', 'views', 'tags'],
    'msdn': [],
    'epam': []
}

const SubcategoryMenu = category => ()=> {
    var clist = [];
    if(Array.isArray(Menu[category]) && Menu[category].length > 0) {
        clist = Menu[category].match((c,i) => {
            <NavLink key={`${c}-{i}`} to="/abc/efg">
            {c}</NavLink>
        })
    }

    return (
    <div className="grid s-btn-group js-filter-btn">
        {clist}
    </div>
    )
}

export default SubcategoryMenu;