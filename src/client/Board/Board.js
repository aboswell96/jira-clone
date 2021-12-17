import React from 'react';
import styled from 'styled-components';
import ProjectURL from '../ProjectURL';
import TextSearchBox from '../utils/TextSearchBox';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BugReportIcon from '@mui/icons-material/BugReport';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Container = styled.div`
    margin-left: 40px;
    margin-top: 30px;
    width: 100%;
`

const Title = styled.div`
    white-space: nowrap;
    margin-top: 15px;
    font-size: 24px;
    font-family: CircularStdMedium;
`

const lanes = [
    {
        'title':'Backlog',
        'tickets': [
            {
                'title':'Add Drag n Drop',
                'type':'bug',
                'priority':'sev2',
            },
            {
                'title':'Add backend',
                'type':'story',
                'priority':'sev1',
            }
        ],
    },
    {
        'title':'Selected for Development',
        'tickets': [
            {
                'title':'Add ticket search',
                'type':'story',
                'priority':'high',
            },
            {
                'title':'Add ticket filters by status',
                'type':'task',
                'priority':'low',
            },
            {
                'title':'Add description and project type to settings',
                'type':'story',
                'priority':'sev2',
            }
        ],
    },
    {
        'title':'In Progress',
        'tickets':[
            {
                'title':'Add BoardView',
                'type':'story',
                'priority':'low',
            }
        ]
    },
    {
        'title':'Done',
        'tickets':[
            {
                'title':'add routes',
                'type':'story',
                'priority':'sev1',
            }
        ]
    }
];

const Swimlane = styled.div`
    background-color: rgb(244 245 247);
    width: 380px;
    border: 1px solid rgb(244 245 247);
    border-radius: 2px;
`

const SwimlaneHeader = styled.div`
    white-space: nowrap;
    margin-top: 15px;
    margin-left: 10px;
    font-family: CircularStdBook;
    color: #5e6c84;
    font-size:12.5px;
`

const SwimlaneBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 20px 10px 10px 10px;
    font-size: 15px;
    justify-content: flex-start;
`

const TicketCard = styled.div`
    font-family: CircularStdBook;
    background-color: white;
    box-shadow: rgb(9 30 66 / 25%) 0px 1px 2px 0px;
    transition: background 0.1s ease 0s;
    border-radius: 3px;
    cursor: pointer;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 11px;
    color: #172B4D;

    &:hover {
        background-color: rgb(235, 236, 240);
}
`

const BoardViewContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
`

const TicketIcons = styled.div`

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
            <BoardView/>
        </Container>
    );
}

const BoardView = () => {

    const swimLanes = lanes.map((lane,i) => {
        const tickets = lane.tickets.map((ticket,j) => {
            return(
                <TicketCard>
                    {ticket.title}
                    <TicketIcons>
                        {RenderTicketTypeIcon(ticket.type)}
                        {RenderTicketSeverityIcon(ticket.priority)}
                    </TicketIcons>
                </TicketCard>
            )
        });

        return(
            <Swimlane>
                <SwimlaneHeader>
                    {lane.title.toUpperCase()}
                </SwimlaneHeader>
                <SwimlaneBody>
                    {tickets}
                </SwimlaneBody>
            </Swimlane>
        );
    });

    return(
        <BoardViewContainer>
            {swimLanes}
        </BoardViewContainer>
    );
}

const RenderTicketTypeIcon = (type) => {
    switch(type) {

        case "story":
            return(<BookmarkIcon sx={{ color: "#65ba43" }}/>);
        case "task":
            return(<CheckBoxIcon color="primary"/>);
        case "bug":
            return(<BugReportIcon color="action"/>);
        default:
            return(<BookmarkIcon color="success"/>);
    }
}

const RenderTicketSeverityIcon = (priority) => {

    var color = "";

    // 1 #cd1316
    // 2 #e97f33
    // 3 #57a55a
    // 4 #2d8738

    switch(priority) {

        case "sev2":
            color = "#cd1316";
            break;
        case "sev1":
            color = "#e97f33";
            break;
        case "high":
            color = "#57a55a";
            break;
        case "low":
            color = "#2d8738";
            break;
        default:
            color = "#2d8738";
    }

    if(priority === "sev2" || priority === "sev1") {
        return(<ArrowUpwardIcon sx={{ color:{color} }}/>);
    }
    else {
        return(<ArrowDownwardIcon sx={{ color:{color} }}/>);
    }
} 

export default Board;