import React from 'react';
import styled from 'styled-components';


const name = "test name";

const Directory = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    white-space: nowrap;
    font-family: CircularStdBook;
    color: rgb(94, 108, 132);
`

const ProjectURL = () => {
    return(
        <Directory>
            <div>
                Projects
            </div>
            <div>
                /
            </div>
            <div>
                {name}
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