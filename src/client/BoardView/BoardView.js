import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import TextSearchBox from '../utils/TextSearchBox';
import {useTextInput} from '../utils/helpers';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Divider from '@mui/material/Divider';
import BugReportIcon from '@mui/icons-material/BugReport';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Tooltip from '@mui/material/Tooltip';

import _ from "lodash"

import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

const initalLanes = [
    {
        'title':'Backlog',
        'tickets': [
            {
                'title':'Add Drag n Drop',
                'type':'bug',
                'priority':'sev2',
                'assignee': -1,
                'id': 13432,
            },
            {
                'title':'Add backend',
                'type':'story',
                'priority':'sev1',
                'assignee': -1,
                'id': 53453,
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
                'assignee': 100,
                'id': 312321,
            },
            {
                'title':'Add ticket filters by status',
                'type':'task',
                'priority':'low',
                'assignee': 200,
                'id': 6754456,
            },
            {
                'title':'Add description and project type to settings',
                'type':'story',
                'priority':'sev2',
                'assignee': 300,
                'id': 43242,
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
                'assignee': 100,
                'id': 56343,
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
                'assignee': 300,
                'id': 76866,
            }
        ]
    }
];

const users = [
    {
        'firstName': 'Joey',
        'lastName': 'Tribbiani',
        'photo': 'https://i.ibb.co/vhJVFpQ/joey-tribbiani-3.jpg',
        'id': 100,
    },
    {
        'firstName': 'Monica',
        'lastName': 'Geller',
        'photo':'https://i.ibb.co/b636CY2/monica-geller-2.jpg',
        'id': 200,
    },
    {
        'firstName': 'Ross',
        'lastName': 'Geller',
        'photo': 'https://i.ibb.co/gts0j76/ross-geller-2.jpg',
        'id': 300,
    }
]

let initialUsersSelected = [
    {
        'id': 100,
        'isSelected': false,
    },
    {
        'id': 200,
        'isSelected': false,
    },
    {
        'id': 300,
        'isSelected': false,
    }
];

const BoardView = () => {

    const [searchInput,onChange] = useTextInput("");
    const [usersSelected, SetUsersSelected] = useState([]);
    const [myIssuesSelected, SetMyIssuesSelected] = useState(false);
    const [recentlyUpdatedSelected, SetRecentlyUpdatedSelected] = useState(false);

    useEffect(() => {
        SetUsersSelected(_.cloneDeep(initialUsersSelected));
    }, []);

    const OnHeroClicked = (id) => {
        const newUsers = usersSelected.slice();
        let index = newUsers.findIndex(user => user.id === id);
        newUsers[index].isSelected = !newUsers[index].isSelected;
        SetUsersSelected(newUsers);
    }

    const OnClearFiltersClicked = () => {
        SetUsersSelected(_.cloneDeep(initialUsersSelected));
        onChange({target:{value:""}});
        SetMyIssuesSelected(false);
        SetRecentlyUpdatedSelected(false);
    }

    const OnMyIssuesClicked = (filter) => {
        SetMyIssuesSelected(!myIssuesSelected);
    }

    const OnRecentlyUpdatedClicked = (filter) => {
        SetRecentlyUpdatedSelected(!recentlyUpdatedSelected);
    }

    const bIsFiltered = (searchInput.length || usersSelected.some(user => user.isSelected) || myIssuesSelected || recentlyUpdatedSelected);

    const userAvatars = users.map((user,i) => {

        const isActive = usersSelected.some(userr => userr.isSelected && userr.id === user.id);

        return(
            <Tooltip title={user.firstName + " " + user.lastName} placement="top" key={i}>
                <UserAvatar
                    img={user.photo}
                    onClick={()=>OnHeroClicked(user.id)}
                    height={'32px'}
                    width={'32px'}
                    active={isActive}
                />
            </Tooltip>
        );
    })

    return(
        <div style={{'margin-top':'30px'}}>
            <BoardFilters>
                <TextSearchBox
                    value={searchInput}
                    onChange={onChange}
                />
                <UserAvatars>
                    {userAvatars}
                </UserAvatars>
                <BoardFilter
                    onClick={OnMyIssuesClicked}
                    active={myIssuesSelected}
                >
                    My Issues
                </BoardFilter>
                <BoardFilter
                    onClick={OnRecentlyUpdatedClicked}
                    active={recentlyUpdatedSelected}
                >
                    Recently Updated
                </BoardFilter>
                {   bIsFiltered &&
                    <Divider orientation="vertical" flexItem />
                }
                {   bIsFiltered &&
                    <ClearFilter
                        onClick={OnClearFiltersClicked}
                    >
                        Clear All
                    </ClearFilter>
                }
            </BoardFilters>
            <Swimlanes
                searchInput={searchInput.toLowerCase().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")}   //ignore regex characters so the search doesn't break
                usersSelected={usersSelected}
                isFiltered={bIsFiltered}
                myIssuesSelected={myIssuesSelected}
                recentlyUpdated={recentlyUpdatedSelected}
            />
        </div>
    );
}

const Swimlanes = (props) => {

    const [lanes,setLanes] = useState(_.cloneDeep(initalLanes));

    const onDrop = (e) => {

        //if user drops the ticket on the same lane it was originally in
        if(lanes.some(lane => lane.tickets.some(ticket => ((ticket.id === e.dragData.ticketId) && (lane.title === e.dropData.laneTitle))))) {
            return;
        }

        let newLanes = _.cloneDeep(lanes);

        //find ticket with id, remove and add to lane
        for (var i=0; i<lanes.length;i++){
            
            const ticketIndex = lanes[i].tickets.findIndex(ticket => ticket.id === e.dragData.ticketId);

            if(ticketIndex !== -1) {

                let newTicket = _.cloneDeep(newLanes[i].tickets[ticketIndex]);
                newLanes[i].tickets.splice(ticketIndex,1);

                let laneToAddTicketTo = newLanes.filter(lane => lane.title === e.dropData.laneTitle)[0];
                laneToAddTicketTo.tickets.push(newTicket);

                setLanes(newLanes);
                break;
            }
        }
    }

    const test = (e) => {
        console.log( e + " dropped2");
    }

    const swimLanes = lanes.map((lane,i) => {

        let tickets = _.cloneDeep(lane.tickets);
        const totalTicketsInLane = tickets.length;

        if (props.recentlyUpdated) {
            //Recently Updated selected => for now just show empty board
            tickets=[];
        }
        else {
            //if any avatars are selected
            if (props.usersSelected.some(user => user.isSelected))
            {
                const filteredUsers = props.usersSelected.filter(user => user.isSelected);
                tickets = tickets.filter(ticket => filteredUsers.some(user => user.id === ticket.assignee || (props.myIssuesSelected && ticket.assignee === 100)));
            }
        }

        //filter using the TextSearchBox component
        tickets = tickets.filter(ticket => ticket.title.toLowerCase().search(props.searchInput) > -1);

        const TicketComponents = tickets.map((ticket,j) => {

            const assignee = users.filter(user => ticket.assignee === user.id);

            let ticket_ = <TicketCard>
                        {ticket.title}
                        <TicketIcons>
                            {RenderTicketTypeIcon(ticket.type)}
                            {RenderTicketSeverityIcon(ticket.priority)}
                            {assignee[0] &&
                            <Tooltip title={assignee[0].firstName + " " + assignee[0].lastName} placement="top">
                                <UserAvatar
                                    img={assignee[0].photo}
                                    height={'24px'}
                                    width={'24px'}
                                />
                            </Tooltip>}
                        </TicketIcons>
            </TicketCard>

            return(
                <DragDropContainer
                    targetKey="foo"
                    key={j}
                    onDrop={onDrop}
                    dragData={{ticketId:ticket.id}}
                >
                    {ticket_}
                </DragDropContainer>
            )
        });

        return(
            <DropTarget
                key={i}
                targetKey="foo"
                dropData={{'laneTitle':lane.title}}
                onHit={test}
            >
                <Swimlane>
                    <SwimlaneHeader>
                        {lane.title.toUpperCase() + " " + (props.isFiltered ? tickets.length + " of " + totalTicketsInLane : tickets.length)}
                    </SwimlaneHeader>
                    <SwimlaneBody>
                        {TicketComponents}
                    </SwimlaneBody>
                </Swimlane>
            </DropTarget>
        );

        // return(
        // <Swimlane>
        //     <SwimlaneHeader>
        //         {lane.title.toUpperCase() + " " + (props.isFiltered ? tickets.length + " of " + totalTicketsInLane : tickets.length)}
        //     </SwimlaneHeader>
        //     <SwimlaneBody>
        //         {TicketComponents}
        //     </SwimlaneBody>
        // </Swimlane>);

    });

    return(
        <BoardViewContainer>
            {swimLanes}
        </BoardViewContainer>
    );
};

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

const BoardViewContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
`

const BoardFilters = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`

const ClearFilter = styled.button`
    background-color: white;
    border: none;
    color: rgb(66, 82, 110);
    font-family: CircularStdBook;
    border-radius: 3px;

    &:hover {
        color: rgb(94, 108, 132);
        cursor: pointer;
    }

    ${({ active }) => active && `
        background: rgb(210, 229, 254) !important;
        color: rgb(0, 82, 204);
    `}
    
`

const BoardFilter = styled.button`
    background-color: white;
    border: none;
    color: rgb(66, 82, 110);
    font-family: CircularStdBook;
    border-radius: 3px;
    font-size: 14.5px;

    &:hover {
        ${'' /* color: rgb(94, 108, 132); */}
        cursor: pointer;
        background-color: rgb(244 245 247);
    }

    ${({ active }) => active && `
        background: rgb(210, 229, 254) !important;
        color: rgb(0, 82, 204);
    `}
    
`

const Swimlane = styled.div`
    background-color: rgb(244 245 247);
    width: 380px;
    border: 1px solid rgb(244 245 247);
    border-radius: 2px;
`

const SwimlaneBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 20px 10px 10px 10px;
    font-size: 15px;
    justify-content: flex-start;
`

const SwimlaneHeader = styled.div`
    white-space: nowrap;
    margin-top: 15px;
    margin-left: 10px;
    font-family: CircularStdBook;
    color: #5e6c84;
    font-size:12.5px;
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

const TicketIcons = styled.div`
    display: flex;
`

const UserAvatar = styled.div`
    display: block;
    background-image: url(${props => props.img});
    background-position:50% 50%;
    background-repeat:no-repeat;
    background-size: cover;
    background-color: rgb(235, 236, 240);
    height: ${props => props.height};
    width: ${props => props.height};
    border-radius:100%;
    margin-left: auto;

    ${({ active }) => active && `
        outline: 3px solid #4c9aff;
    `}
`

const UserAvatars = styled.div`
    display:flex;
    padding-right: -10px;

`


export default BoardView;