import Sidebar from '../Sidebar/Sidebar';
import './app.css';
import {Outlet, Link } from 'react-router-dom';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { useState } from 'react';

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
        console.log(newMenuOptionClicked);
        setCurrentHighlightedMenuOption(newMenuOptionClicked);
    }

    const [currentHighlightedMenuOption, setCurrentHighlightedMenuOption] = useState(options[0].title);

    const tabs = options.map((option,i) => {
        return(
            <BoardMenuOption
                title={option.title}
                icon={option.icon}
                url={option.url}
                isActive={currentHighlightedMenuOption === option.title}
                onClick={OnClickBoardMenuOption}
            />);
    });

    return( 
        <div class="container">
            <Sidebar/>
            <div class="container__board__menu">
                <div class="container__board__options">
                {tabs}
                </div>
            </div>
            <div class="container__board">
                <Outlet/>
            </div>
        </div>
    );
};

const BoardMenuOption = (props) => {
    return(
        <Link to={props.url} style={{ textDecoration: 'none', color:'inherit' }} onClick={()=>props.onClick(props.title)}>
            <div class={props.isActive ? "container__board__option__active" : "container__board__option__inactive"}>
                <div class="container__board__option__icon">
                    {renderIcon(props.icon, props.isActive)}
                </div>
                <div class={props.isActive ? "container__board__menu__title__active" : "container__board__menu__title__inactive"}>
                {props.title}
                </div>
            </div>
        </Link>
    );
}

const renderIcon = (title, status) => {
    const color = status ? 'primary' : 'active';
    switch(title) {
        case 'board':
            return <TableChartOutlinedIcon color={color} />;
        case 'settings':
            return <SettingsOutlinedIcon color={color} />;
        default:
            return <SettingsOutlinedIcon color={color} />;
    }
}

export default App;