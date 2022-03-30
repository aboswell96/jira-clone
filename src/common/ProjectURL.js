import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  white-space: nowrap;
  font-family: CircularStdBook;
  color: rgb(94, 108, 132);
  font-size: 15px;
`;

const ProjectURL = (props) => {
  return (
    <Container>
      {['Projects', props.projectName, props.pageName].join(' / ')}
    </Container>
  );
};

export default ProjectURL;
