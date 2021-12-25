import { useState } from 'react';
import styled from 'styled-components';

import {Link } from 'react-router-dom';

const Icon = styled.img`
    height:32px;
    width:32px;
    margin: auto;
    display:block;
    padding-top: 35px;

    ${({expanded}) => `
        margin-left:15px;
    `}
`

const SidebarComponent = styled.div`
    height: 100vh;
    background-color: #0747a6;
    transition: width 0.1s;
    margin: 0;
    position: absolute;
`

const Sidebar = () => {

    const [sidebarWidth, SetSideBarWidth] = useState("64px");

    const mouseEnter = () => {
        SetSideBarWidth("200px");
    };

    const mouseLeave = () => {
        SetSideBarWidth("64px");
    };

    return(
        <SidebarComponent
            style={{width:sidebarWidth}}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            >
            <Link to="board" style={{ textDecoration: 'none', color:'inherit' }}>
                <Icon
                    src="https://i.ibb.co/fGyrz6b/jira-icon.png" 
                    alt="Icon"
                    expanded={sidebarWidth}
                />
            </Link>
            </SidebarComponent>
    );
}

export default Sidebar;