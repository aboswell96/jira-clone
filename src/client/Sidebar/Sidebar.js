import { useState } from 'react';
import styled from 'styled-components';

const Sidebar = () => {

    const [sidebarWidth, SetSideBarWidth] = useState("64px");

    const mouseEnter = () => {
        SetSideBarWidth("200px");
    };

    const mouseLeave = () => {
        SetSideBarWidth("64px");
    };

    const Sidebar = styled.div`
        height: 100vh;
        background-color: #0747a6;
        transition: width 0.1s;
        margin: 0;
        position: absolute;
    `

    return(
        <Sidebar
            class="container__sidebar"
            style={{width:sidebarWidth}}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            >
        </Sidebar>
    );
}

export default Sidebar;