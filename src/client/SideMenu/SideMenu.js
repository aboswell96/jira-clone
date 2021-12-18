import styled from 'styled-components';
import '../global-styles.js';
import {Link } from 'react-router-dom';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const BoardMenu = styled.div`
    background-color: rgb(244 245 247);
    width: 230px;
    margin-left: 64px;
    border-right: 1px solid rgb(223, 225, 230);
    flex-shrink: 0;
`

const BoardAvatar = styled.div`
    display: flex;
    margin-left: 20px;
    margin-top: 25px;
    font-family: CircularStdMedium;
    font-size: 15px;
`

const BoardTextPanel = styled.div`
    margin:auto;
    margin-left: 10px;
`

const BoardOptions = styled.div`
    width: 200px;
    margin: auto;
    justify-content: center;
    padding-top: 15px;
`

const ProjectType = styled.div`
    color: rgb(94, 108, 132);
    font-size: 14px;
`

const Tab = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    border-radius: 3px;
    overflow: hidden;
    font-family: CircularStdBook;
    background-color: rgb(244 245 247);
    transition: background 0.1s ease 0s;

    ${({ active }) => active && `
        color: rgb(23, 43, 77);
        background-color: rgb(235, 236, 240);
    `}

    &:hover {
        background-color: rgb(235, 236, 240);
    }
`
const Title = styled.div`
    color: black;

    ${({ active }) => active && `
        color: #0052cc;
    `}
`

const ProjectIcon = styled.div`
padding-left: 10px;
`

const SideMenu = (props) => {
    const tabs = props.tabs.map((option,i) => {
        return(
            <BoardMenuOption
                key={i}
                title={option.title}
                icon={option.icon}
                url={option.url}
                isActive={props.current === option.title}
                onClick={props.onClick}
            />);
    });

    return(
        <BoardMenu>
            <BoardAvatar>
                <img src="https://i.ibb.co/S686zGM/rocket3.png" alt="Project Icon" style={{'height':'40px', 'width':'40px', 'border':'2px', 'border-radius': '3px'}}></img>
                <BoardTextPanel>
                    {props.projectName}
                    <ProjectType>
                        {props.projectType}
                    </ProjectType>
                </BoardTextPanel>
            </BoardAvatar>
            <BoardOptions>
                {tabs}
            </BoardOptions>
        </BoardMenu>
    );
}

const BoardMenuOption = (props) => {

    return(
        <Link to={props.url} style={{ textDecoration: 'none', color:'inherit' }} onClick={()=>props.onClick(props.title)}>
            <Tab active={props.isActive}>
                <ProjectIcon>
                    {renderIcon(props.icon, props.isActive)}
                </ProjectIcon>
                <Title active={props.isActive}>
                    {props.title}
                </Title>
            </Tab>
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