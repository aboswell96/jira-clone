import styled from 'styled-components';
import ProjectURL from '../ProjectURL';

import BoardView from './BoardView';

const Container = styled.div`
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 30px;
    width: auto;
`

const Title = styled.div`
    white-space: nowrap;
    margin-top: 10px;
    font-size: 24px;
    font-family: CircularStdMedium;
`

const BoardContainer = (props) => {
    return(
        <Container>
            <ProjectURL
                projectName={props.projectName}
                pageName="Kanban Board"
            />
            <Title>
                Kanban Board
            </Title>
            <BoardView/>
        </Container>
    );
}

export default BoardContainer;