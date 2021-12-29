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
import TicketModal from '../utils/TicketModal';

import { readFromDB,writeToDB } from '../../firebase/firebase';

import ClipLoader from "react-spinners/ClipLoader";

import { delay } from '../utils/helpers';

const tempLanes = [
    {
        'title': 'Backlog',
        'code': 'backlog'
    },
    {
        'title': 'In Development',
        'code': 'inDevelopment'
    },
    {
        'title': 'In Progress',
        'code': 'inProgress'
    },
    {
        'title': 'Done',
        'code': 'done'
    }];

const BoardView = () => {

    const [searchInput,setSearchInput] = useTextInput("");
    const [usersSelected, SetUsersSelected] = useState([]);
    const [myIssuesSelected, SetMyIssuesSelected] = useState(false);
    const [recentlyUpdatedSelected, SetRecentlyUpdatedSelected] = useState(false);

    let [loading, setLoading] = useState(true);

    const [dbUsers, setDbUsers] = useState([{},{},{}]);

    useEffect(() => {
        readFromDB('users',setDbUsers);
        delay(200).then(() => setLoading(false));
    }, []);

    useEffect(() => {
        SetUsersSelected(createFilterStates(dbUsers));
    },[dbUsers]);

    const createFilterStates = (users) => {
        return Object.entries(users).map((user,i) =>  {
            return({'id':user[0],'isSelected': false,});
        })
    };

    const OnHeroClicked = (id) => {
        const newUsers = usersSelected.slice();
        let index = newUsers.findIndex(user => user.id === id);
        if(index >= 0){
            newUsers[index].isSelected = !newUsers[index].isSelected;
            SetUsersSelected(newUsers);
        };
    }

    const OnClearFiltersClicked = () => {
        SetUsersSelected(createFilterStates(dbUsers));
        setSearchInput({target:{value:""}});
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

    const userAvatars = Object.entries(dbUsers).map((user,i) => {

        if (loading) {
            return(
                <ClipLoader color="#0747a6" loading={loading} size={28} />
            );
        }

        const isActive = usersSelected.some(userr => userr.isSelected && userr.id === user[0]);

        return(
            <Tooltip title={user[1].firstName + " " + user[1].lastName} placement="top" key={i}>
                <UserAvatar
                    img={user[1].photo}
                    onClick={()=>OnHeroClicked(user[0])}
                    height={'32px'}
                    width={'32px'}
                    active={isActive}
                />
            </Tooltip>
        );
    })

    return(
        <div style={{'marginTop':'30px'}}>
            <BoardFilters>
                <TextSearchBox
                    value={searchInput}
                    onChange={setSearchInput}
                    width="160px"
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
                users={dbUsers}
            />
        </div>
    );
}

const Swimlanes = (props) => {
    const [currentLaneHovered, setCurrentLaneHovered] = useState(-1);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [dbTickets, setDbTickets] = useState([]);
    const [ticketsArray, setTicketsArray] = useState([]);

    useEffect(() => {
        readFromDB('tickets',setDbTickets);
    },[])

    useEffect(() => {
        console.log("loaded " + JSON.stringify(dbTickets));
    },[dbTickets]);

    //these fire on mount and update so it must have a condition to prevent infinite renders!
    const OnDragEnter = (e, i) => {
        if (i !== currentLaneHovered){
            setCurrentLaneHovered(i);
        }
    }

    const OnDragLeave = (e, i) => {
        if(i !== -1){
            setCurrentLaneHovered(-1);
        }
    }

    const onDrop = (e) => {
        //if user drops the ticket on the same lane it was originally in

        // const ticketObj = dbTickets.filter(ticket => ticket.id === e.dragData.ticketId)[0];
        const ticketObj = Object.entries(dbTickets).filter(ticket => ticket.id === e.dragData.ticketId)[0];
        const ticketLane = tempLanes.filter(lane => lane.code === ticketObj.lane)[0];

        if(ticketLane.code === e.dropData.laneTitle){
            setCurrentLaneHovered(-1);
            return;
        }

        // var newTicket = _.cloneDeep(ticketObj);
        // newTicket.lane = e.dropData.laneTitle;
        // writeToDB('tickets/' + ticketObj.id,newTicket);


        // let newTickets = _.cloneDeep(dbTickets);
        // let ticketIndex = dbTickets.findIndex(ticket => ticket.id === ticketObj.id);
        // newTickets[ticketIndex].lane = e.dropData.laneTitle;
        // setDbTickets(newTickets);
        setCurrentLaneHovered(-1);
    };

    const swimLanes = tempLanes.map((lane,i) => {

        // let filteredTickets = dbTickets.filter(ticket => ticket.lane === lane.code);
        var filteredTickets = Object.entries(dbTickets).filter(ticket => ticket[1].lane === lane.code);

        const numMaxTickets = filteredTickets.length;

        if (props.recentlyUpdated) {
            //Recently Updated selected => for now just show empty board
            filteredTickets=[];
        }
        else {
            //if any avatars are selected
            if (props.usersSelected.some(user => user.isSelected))
            {
                const filteredUsers = props.usersSelected.filter(user => user.isSelected);
                filteredTickets = filteredTickets.filter(ticket => filteredUsers.some(user => (user.id == ticket[1].assignee) || (props.myIssuesSelected && ticket[1].assignee == 64980)));
            }
        }

        //filter using the TextSearchBox component
        filteredTickets = filteredTickets.filter(ticket => ticket[1].title.toLowerCase().search(props.searchInput) > -1);

        const TicketComponents = filteredTickets.map((ticket,j) => {
            const assignee = Object.entries(props.users).filter(user => ticket[1].assignee == user[0]);
            return( 
                <DragDropContainer
                    targetKey="moveTicket"
                    key={j}
                    onDrop={onDrop}
                    dragData={{ticketId:ticket[0]}}
                >
                    <TicketCard
                        onClick={handleOpen}
                    >
                        {ticket[1].title}
                        <TicketIcons>
                            {RenderTicketTypeIcon(ticket[1].type)}
                            {RenderTicketSeverityIcon(ticket[1].priority)}
                            {assignee[0] &&
                            <Tooltip title={assignee[0][1].firstName + " " + assignee[0][1].lastName} placement="top">
                                <UserAvatar
                                    img={assignee[0][1].photo}
                                    height={'24px'}
                                    width={'24px'}
                                />
                            </Tooltip>}
                        </TicketIcons>
                    </TicketCard>
                </DragDropContainer>);
        });

        return(
            <DropTarget
                key={i}
                targetKey="moveTicket"
                dropData={{'laneTitle':lane.code}}
                onDragEnter={(e) => OnDragEnter(e, i)}
                onDragLeave={(e) => OnDragLeave(e, i)}
            >
                <Swimlane isHovered={currentLaneHovered === i}>
                    <SwimlaneHeader>
                        {lane.title.toUpperCase() + " " + (props.isFiltered ? filteredTickets.length + " of " + numMaxTickets : filteredTickets.length)}
                    </SwimlaneHeader>
                    <SwimlaneBody>
                        {TicketComponents}
                    </SwimlaneBody>
                </Swimlane>
            </DropTarget>
        );
    });

    return(
        <BoardViewContainer>
            {swimLanes}
            <TicketModal
                open={open}
                handleClose={handleClose}
            />
        </BoardViewContainer>
    );
};

const RenderTicketTypeIcon = (type) => {

    const fontSize = 18;

    switch(type) {

        case "story":
            return(<BookmarkIcon sx={{ color: "#65ba43", 'fontSize':{fontSize}}}/>);
        case "task":
            return(<CheckBoxIcon color="primary" sx={{'fontSize':{fontSize}}}/>);
        case "bug":
            return(<BugReportIcon color="action" sx={{'fontSize':{fontSize}}}/>);
        default:
            return(<BookmarkIcon color="success" sx={{'fontSize':{fontSize}}}/>);
    }
}

const RenderTicketSeverityIcon = (priority) => {

    var color = "";
    const fontSize = 18;
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
        return(<ArrowUpwardIcon sx={{ color:{color}, 'fontSize':{fontSize} }}/>);
    }
    else {
        return(<ArrowDownwardIcon sx={{ color:{color},'fontSize':{fontSize} }}/>);
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
    font-size: 14.5px;

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
    width: 370px;
    border: 5px solid rgb(244 245 247);
    border-radius: 2px;
    outline: none;
    height: 100%;

    ${({ isHovered }) => isHovered && `
        border: 5px solid #4c9aff;
        border-radius: 4px;
    `}
`

const SwimlaneBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 20px;
    font-size: 15px;
    justify-content: flex-start;
    width: 100%;
`

const SwimlaneHeader = styled.div`
    white-space: nowrap;
    margin-top: 10px;
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
    width: 350px;

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