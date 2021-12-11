import Sidebar from '../Sidebar/Sidebar';
import './app.css';
import {Outlet} from 'react-router-dom';

import { useState } from 'react';
import SideMenu from '../SideMenu/SideMenu';

const projectName = "Test Name";
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

const App = () => {

    const OnClickBoardMenuOption = (newMenuOptionClicked) => {
        setSelectedMenuOption(newMenuOptionClicked);
    }

    const [selectedMenuOption, setSelectedMenuOption] = useState(options[0].title);

    return( 
        <div class="container">
            <Sidebar/>
            <SideMenu 
                current={selectedMenuOption}
                onClick={OnClickBoardMenuOption}
                tabs={options}
                projectName={projectName}
                projectType={projectType}
            />
            <div class="container__board">
                <Outlet/>
            </div>
        </div>
    );
};


export default App;