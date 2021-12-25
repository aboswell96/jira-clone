import React from 'react';
import styled from 'styled-components';

const Directory = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    white-space: nowrap;
    font-family: CircularStdBook;
    color: rgb(94, 108, 132);
`

const ProjectURL = (props) => {
    return(
        <Directory>
            <div>
                Projects
            </div>
            <div>
                /
            </div>
            <div>
                {props.projectName}
            </div>
            <div>
                /
            </div>
            <div>
                Kanban Board
            </div>
        </Directory>
    )
}

export default ProjectURL;