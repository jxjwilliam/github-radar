import React from 'react'
import {NavLink} from 'react-router-dom'

const Menu = {
    'github': ['repositories', 'topics', 'commits'],
    'stackoverflow': ['hottest', 'latest', 'views', 'tags'],
    'msdn': [],
    'epam': []
}

const SubcategoryMenu = category => ({handleClick})=> {
    var clist = [];
    if(Array.isArray(Menu[category]) && Menu[category].length > 0) {
        clist = Menu[category].match((c,i) => {
            <NavLink class="grid--cell s-btn s-btn__muted s-btn__outlined" key={`${c}-{i}`} onClick={handleClick}>
            {c}</NavLink>
        })
    }

    return (
    <div class="grid s-btn-group js-filter-btn">
        {clist}
    </div>
    )
}

export default SubcategoryMenu;