import {Outlet} from 'react-router-dom';
import {useState} from 'react';
import styled from 'styled-components';

import Sidebar from '../Sidebar/Sidebar';
import SideMenu from '../SideMenu/SideMenu';

const projectType = "Software project";

const options = [
    {
        'title': 'Kanban Board', 
        'icon': 'board',
        'url': 'board'
    }, 
    {
        'title': 'Project Settings',
        'icon': 'settings',
        'url': 'settings'
    }
];

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 100vh;
    gap: 0;
`

const Board = styled.div`
    width: 100%;
`

const Project = (props) => {

    const OnClickBoardMenuOption = (newMenuOptionClicked) => {
        setSelectedMenuOption(newMenuOptionClicked);
    }

    const [selectedMenuOption, setSelectedMenuOption] = useState(options[0].title);

    return(
        <Container>
            <Sidebar/>
            <SideMenu 
                current={selectedMenuOption}
                onClick={OnClickBoardMenuOption}
                tabs={options}
                projectName={props.projectName}
                projectType={projectType}
            />
            <Board>
                <Outlet/>
            </Board>
        </Container>
    );
};


export default Project;