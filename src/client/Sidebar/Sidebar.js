import { useState } from 'react';
import './sidebar.css';

const Sidebar = () => {

    const [sidebarWidth, SetSideBarWidth] = useState("64px");

    const mouseEnter = () => {
        SetSideBarWidth("200px");
    };

    const mouseLeave = () => {
        SetSideBarWidth("64px");
    };

    return(
        <div
            class="container__sidebar"
            style={{width:sidebarWidth}}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            >
        </div>
    );
}

export default Sidebar;