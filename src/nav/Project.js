import { Outlet } from 'react-router-dom';
import { createContext, useState } from 'react';
import styled from 'styled-components';
import '../style.css';
import Sidebar from '../search/Sidebar';
import SideMenu from './SideMenu';
import useWindowDimensions from '../common/customHooks/useWindowDimensions';

export const ThemeContext = createContext();

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
  min-width: 760px;
  gap: 0;
`;

const Board = styled.div`
  width: 100%;
  background-color: ${(props) => (props.darkTheme ? '#010409' : 'white')};

  ${({ isMinimized }) =>
    isMinimized &&
    `
        padding-left: 64px;
    `}
`;

const Project = (props) => {
  const { height, width } = useWindowDimensions();
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const [selectedMenuOption, setSelectedMenuOption] = useState(
    options[0].title
  );

  const OnClickBoardMenuOption = (newMenuOptionClicked) => {
    setSelectedMenuOption(newMenuOptionClicked);
  };

  return (
    <ThemeContext.Provider value={darkTheme}>
      <Container>
        <Sidebar toggleTheme={toggleTheme} />
        {width > 1000 && (
          <SideMenu
            current={selectedMenuOption}
            onClick={OnClickBoardMenuOption}
            tabs={options}
            projectName={props.projectName}
            projectType={projectType}
          />
        )}
        <Board isMinimized={width <= 1000} darkTheme={darkTheme}>
          <Outlet />
        </Board>
      </Container>
    </ThemeContext.Provider>
  );
};

export default Project;
