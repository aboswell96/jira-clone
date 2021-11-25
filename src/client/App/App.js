import Sidebar from '../Sidebar/Sidebar';
import './app.css';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const options = [
    {
        'title': 'Kanban Board', 
        'icon': 'board'
    }, 
    {
        'title': 'Project Settings',
        'icon': 'settings'
    }
];

const App = () => {

    const tabs = options.map((option,i) => {
        return(
            <div class="container__board__option">
                <div class="container__board__option__icon">
                    {renderIcon(option.icon)}
                </div>
                {option.title}
            </div>
        )
    })

    return( 
        <div class="container">
            <Sidebar/>
            <div class="container__board__menu">
                <div class="container__board__options">
                    {tabs}
                </div>
            </div>
            <div class="container__board">
            </div>
        </div>
    );
};

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