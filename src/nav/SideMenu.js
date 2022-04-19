import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import { ThemeContext } from '../nav/Project';

const tabsInDevelopment = [
  {
    title: 'Reports',
    icon: 'reports',
  },
  {
    title: 'Issues and Epics',
    icon: 'epics',
  },
  {
    title: 'Advanced Issue Stats',
    icon: 'stats',
  },
];

const BoardMenuOption = (props) => {
  const darkTheme = useContext(ThemeContext);
  return (
    <Link
      to={props.url}
      style={{ textDecoration: 'none', color: 'inherit' }}
      onClick={() => props.onClick(props.title)}
    >
      <Tab active={props.isActive} darkTheme={darkTheme}>
        <ProjectIcon>{renderIcon(props.icon, props.isActive)}</ProjectIcon>
        <Title active={props.isActive} darkTheme={darkTheme}>
          {props.title}
        </Title>
      </Tab>
    </Link>
  );
};

const BoardMenuOptionDev = (props) => {
  const darkTheme = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <TabDev
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      darkTheme={darkTheme}
    >
      <ProjectIcon>{renderIcon(props.icon, props.isActive)}</ProjectIcon>
      {isHovered ? (
        <TitleNotImplemented>IN DEVELOPMENT</TitleNotImplemented>
      ) : (
        <Title darkTheme={darkTheme}>{props.title}</Title>
      )}
    </TabDev>
  );
};

const SideMenu = (props) => {
  const darkTheme = useContext(ThemeContext);
  const tabs = props.tabs.map((option, i) => {
    return (
      <BoardMenuOption
        key={i}
        title={option.title}
        icon={option.icon}
        url={option.url}
        isActive={props.current === option.title}
        onClick={props.onClick}
      />
    );
  });
  const tabsDev = tabsInDevelopment.map((tab, i) => {
    return <BoardMenuOptionDev key={i} title={tab.title} icon={tab.icon} />;
  });
  return (
    <BoardMenu darkTheme={darkTheme}>
      <BoardAvatar>
        <img
          src="https://i.ibb.co/S686zGM/rocket3.png"
          alt="Project Icon"
          style={{
            height: '40px',
            width: '40px',
            border: '2px',
            borderRadius: '3px',
          }}
        ></img>
        <BoardTextPanel darkTheme={darkTheme}>
          {props.projectName}
          <ProjectType>{props.projectType}</ProjectType>
        </BoardTextPanel>
      </BoardAvatar>
      <BoardOptions>{tabs}</BoardOptions>
      <hr
        style={{ borderTop: '1px solid rgb(193, 199, 208)', width: '197px' }}
      ></hr>
      <BoardOptionsInDevelopment>{tabsDev}</BoardOptionsInDevelopment>
    </BoardMenu>
  );
};

const renderIcon = (title, status) => {
  const color = status ? 'primary' : 'active';
  switch (title) {
    case 'board':
      return <TableChartOutlinedIcon color={color} />;
    case 'settings':
      return <SettingsOutlinedIcon color={color} />;
    case 'reports':
      return <AssessmentOutlinedIcon color={color} />;
    case 'epics':
      return <DynamicFeedOutlinedIcon color={color} />;
    case 'stats':
      return <QueryStatsOutlinedIcon color={color} />;
    default:
      return <SettingsOutlinedIcon color={color} />;
  }
};

const BoardMenu = styled.div`
  background-color: ${(props) => (props.darkTheme ? '#0d1117' : '#f4f5f7')};
  width: 230px;
  margin-left: 64px;
  border-right: ${(props) => (props.darkTheme ? '#0d1117' : '#dfe1e6')};
  flex-shrink: 0;
`;

const BoardAvatar = styled.div`
  display: flex;
  margin-left: 20px;
  margin-top: 25px;
  font-family: CircularStdMedium;
  font-size: 15px;
`;

const BoardTextPanel = styled.div`
  color: ${(props) => (props.darkTheme ? 'white' : 'black')};
  margin: auto;
  margin-left: 10px;
`;

const BoardOptions = styled.div`
  width: 200px;
  margin: auto;
  justify-content: center;
  padding-top: 30px;
`;

const BoardOptionsInDevelopment = styled.div`
  width: 200px;
  margin: auto;
  justify-content: center;
  margin-top: 8px;
`;

const ProjectType = styled.div`
  color: rgb(94, 108, 132);
  font-size: 13px;
  font-family: CircularStdBook;
`;

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
  background-color: ${(props) => (props.darkTheme ? '#0d1117' : '#f4f5f7')};
  color: ${(props) => (props.darkTheme ? 'white' : 'black')};
  transition: background 0.1s ease 0s;

  ${({ active }) =>
    active &&
    `
        color: #172b4d;
        background-color: ${(props) =>
          props.darkTheme ? '#0d1117' : '#ebecf0'};
    `}

  &:hover {
    background-color: ${(props) => (props.darkTheme ? '#21262d' : '#ebecf0')};
  }
`;

const TabDev = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  border-radius: 3px;
  overflow: hidden;
  font-family: CircularStdBook;
  background-color: ${(props) => (props.darkTheme ? '#0d1117' : '#f4f5f7')};
  color: ${(props) => (props.darkTheme ? 'white' : 'black')};
  transition: background 0.1s ease 0s;

  &:hover {
    cursor: not-allowed;
  }
`;
const Title = styled.div`
  color: ${(props) => (props.darkTheme ? 'white' : 'black')};
  font-size: 14.7px;

  ${({ active }) =>
    active &&
    `
        color: #0052cc;
    `}
`;

const TitleNotImplemented = styled.div`
  color: rgb(66, 82, 110);
  background: rgb(223, 225, 230);
  font-size: 14.7px;
  padding: 5px 0px 5px 8px;
  width: 140px;
  border-radius: 3px;
  font-size: 11.5px;
  font-family: CircularStdBold;
  font-weight: normal;
`;

const ProjectIcon = styled.div`
  padding-left: 10px;
`;

export default SideMenu;
