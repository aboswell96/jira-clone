import Sidebar from '../Sidebar/Sidebar';
import './app.css';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

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

    const tabs = options.map((option,i) => {
        return(
            <BoardMenuOption
                title={option.title}
                icon={option.icon}
                url={option.url}
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
        <Link to={props.url} style={{ textDecoration: 'none', color:'inherit' }}>
        <div class="container__board__option">
        <div class="container__board__option__icon">
            {renderIcon(props.icon)}
        </div>
        {props.title}
        </div>
    </Link>
    );
}

const renderIcon = (param) => {
    switch(param) {
        case 'board':
            return <TableChartOutlinedIcon color="action" />;
        case 'settings':
            return <SettingsOutlinedIcon color="action" />;
        default:
            return <SettingsOutlinedIcon color="action" />;
    }
}

export default App;