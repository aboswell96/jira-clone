import React from 'react';
import styled from 'styled-components';
import ProjectURL from '../ProjectURL';
import TextSearchBox from '../utils/TextSearchBox';

const Container = styled.div`
    margin-left: 40px;
    margin-top: 30px;
`

const Title = styled.div`
    white-space: nowrap;
    margin-top: 15px;
    font-size: 24px;
    font-family: CircularStdMedium;
`

const Board = (props) => {
    return(
        <Container>
            <ProjectURL
                projectName={props.projectName}
            />
            <Title>
                Kanban Board
            </Title>
            <TextSearchBox/>
        </Container>
    );
}

export default Board;