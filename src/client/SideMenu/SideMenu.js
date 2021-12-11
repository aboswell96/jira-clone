import './SideMenu.css';
import {Link } from 'react-router-dom';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const SideMenu = (props) => {

    const tabs = props.tabs.map((option,i) => {
        return(
            <BoardMenuOption
                title={option.title}
                icon={option.icon}
                url={option.url}
                isActive={props.current === option.title}
                onClick={props.onClick}
            />);
    }); 

    return(
        <div class="container__board__menu">
            <div class="container__board__project__avatar">
                <img src="https://i.ibb.co/S686zGM/rocket3.png" alt="Project Icon" style={{'height':'40px', 'width':'40px', 'border':'2px', 'border-radius': '3px'}}></img>
                <div class="container__board__project__avatar__textpanel">
                    <div  class="container__board__project__avatar__name">
                        {props.projectName}
                    </div>
                    <div  class="container__board__project__avatar__type">
                    {props.projectType}
                    </div>
                </div>
            </div>
            <div class="container__board__options">
                {tabs}
            </div>
        </div>
    );
}

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

export default SideMenu;