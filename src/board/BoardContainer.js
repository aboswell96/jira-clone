import { useContext } from 'react';
import styled from 'styled-components';
import ProjectURL from '../common/ProjectURL';

import BoardView from './BoardView';
import { ThemeContext } from '../nav/Project';

const Container = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 30px;
  width: auto;
`;

const Title = styled.div`
  white-space: nowrap;
  margin-top: 10px;
  font-size: 24px;
  font-family: CircularStdMedium;
  color: ${(props) => (props.darkTheme ? 'white' : 'black')};
`;

const BoardContainer = (props) => {
  const darkTheme = useContext(ThemeContext);
  return (
    <Container>
      <ProjectURL projectName={props.projectName} pageName="Kanban Board" />
      <Title darkTheme={darkTheme}>Kanban Board</Title>
      <BoardView />
    </Container>
  );
};

export default BoardContainer;
