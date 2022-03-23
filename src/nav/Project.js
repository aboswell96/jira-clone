import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import '../style.css';

import Sidebar from '../search/Sidebar';
import SideMenu from './SideMenu';

import useWindowDimensions from '../common/customHooks/useWindowDimensions';

const projectType = 'Software project';

const options = [
  {
    title: 'Kanban Board',
    icon: 'board',
    url: 'board',
  },
  {
    title: 'Project Settings',
    icon: 'settings',
    url: 'settings',
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  gap: 0;
`;

const Board = styled.div`
  width: 100%;

  ${({ isMinimized }) =>
    isMinimized &&
    `
        padding-left: 64px;
    `}
`;

const Project = (props) => {
  const { height, width } = useWindowDimensions();

  const OnClickBoardMenuOption = (newMenuOptionClicked) => {
    setSelectedMenuOption(newMenuOptionClicked);
  };

  const [selectedMenuOption, setSelectedMenuOption] = useState(
    options[0].title
  );

  return (
    <Container>
      <Sidebar />
      {width > 1000 && (
        <SideMenu
          current={selectedMenuOption}
          onClick={OnClickBoardMenuOption}
          tabs={options}
          projectName={props.projectName}
          projectType={projectType}
        />
      )}
      <Board isMinimized={width <= 1000}>
        <Outlet />
      </Board>
    </Container>
  );
};

export default Project;
