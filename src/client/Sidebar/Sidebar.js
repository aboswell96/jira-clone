import { useState } from 'react';
import styled from 'styled-components';

import {Link } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const Sidebar = () => {

    const [sidebarWidth, SetSideBarWidth] = useState("64px");
    const [isExpanded, setIsExpanded] = useState(false);

    const mouseEnter = () => {
        SetSideBarWidth("200px");
        setIsExpanded(true);
    };

    const mouseLeave = () => {
        SetSideBarWidth("64px");
        setIsExpanded(false);
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
                    expanded={isExpanded}
                />
            </Link>
            <NavOptions>
                <Tab expanded={isExpanded}>
                    <ProjectIcon
                        expanded={isExpanded}
                    >
                    <SearchIcon sx={{ color: "white",'fontSize':30}}/>
                    </ProjectIcon>
                    <Title>
                        {isExpanded && "Search Issues"}
                    </Title>
                </Tab>
                <Tab expanded={isExpanded}>
                    <ProjectIcon
                        expanded={isExpanded}
                    >
                    <AddIcon sx={{ color: "white",'fontSize':30}}/>
                    </ProjectIcon>
                    <Title>
                        {isExpanded && "Create Issue"}
                    </Title>
                </Tab>
            </NavOptions>
        </SidebarComponent>
    );
}

const Icon = styled.img`
    height:32px;
    width:32px;
    margin: auto;
    display:block;
    padding-top: 35px;

    ${({expanded}) => expanded && `
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

const NavOptions = styled.div`
    padding-top:30px;
`

const Tab = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    overflow: hidden;
    font-family: CircularStdBook;
    transition: background 0.1s ease 0s;

    ${({ expanded }) => expanded && `
        gap: 15px;
    `}

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`

const Title = styled.div`
    color: white;
    font-size: 14.7px;
`

const ProjectIcon = styled.div`
    margin: auto;

    ${({expanded}) => expanded && `
        margin:0;
    `}
`

export default Sidebar;