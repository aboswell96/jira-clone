import React, {useState,useEffect} from 'react';
import styled from 'styled-components';

import { readFromDB } from '../../firebase/firebase';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import UserTile from './UserTile';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BugReportIcon from '@mui/icons-material/BugReport';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StatusTile from './StatusTile';
import PriorityTile from './PriorityTile';

import TextInput from './TextInput';
import { SettingsVoiceSharp } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    pt: 25/8,
    pr: 35/8,
    pb: 60/8,
    pl: 35/8,
    width: 1040,
    bgcolor: 'background.paper',
    boxShadow: 24,
    verticalAlign:'top',
    transform: 'translate(-50%, -50%)',
  };

const TicketModal = (props) => {

    const [dbUsers, setDbUsers] = useState({});

    useEffect(() => {
        readFromDB('users',setDbUsers);
    }, []);

    const ticket = props.ticket[1];
    const ticketID = props.ticket[0];

    const assignee = Object.entries(dbUsers).filter(user => user[0] == ticket.assignee);

    const Unassigned = ["00000",{"firstName":'Unassigned','lastName':'','photo':'https://ibb.co/M9PdhH9'}];

    return(
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TicketPanels>
                        <TicketMainPanel>
                            <TicketType>
                                {RenderTicketTypeIcon(ticket.type)}
                                {ticket.type.toUpperCase() + "-" + ticketID}
                            </TicketType>
                            <Title
                                title={ticket.title}
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#172B4D'}}>Description</span>
                            <Description>
                                Temp Description
                            </Description>
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#172B4D'}}>Comments</span>
                        </TicketMainPanel>
                        <TicketSidePanel>
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>STATUS</span>
                            <StatusTile
                                status={ticket.lane}
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>ASSIGNEES</span>
                                <UserTile
                                    user={assignee.length > 0 ? assignee[0] : Unassigned}
                                    users={Object.entries(dbUsers).concat([Unassigned])}
                                />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>REPORTER</span>
                            <UserTile
                                    user={assignee.length > 0 ? assignee[0] : Unassigned}
                                    users={Object.entries(dbUsers).concat([Unassigned])}
                                />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>PRIORITY</span>
                            <PriorityTile
                                priority={ticket.priority}
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>ORIGINAL ESIMATE(HOURS)</span>
                        </TicketSidePanel>
                    </TicketPanels>
                </Box>
            </Modal>
        );
}

const Title = (props) => {

    const [isEditting, setIsEditting] = useState(false);
    const [value, setValue] = useState(props.title);
    const onChange = (e) => {
        setValue(e.target.value);
    }

    return(
        <div>
            {!isEditting &&
                <TitleContainer
                    onClick={()=>{setIsEditting(true)}}
                >
                    <span style={{'display':'block','paddingTop':'30px', 'color':'#172B4D','fontSize':'24px'}}>{value}</span>
                </TitleContainer>
            }
            {isEditting &&
                <TextInput
                    value={value}
                    onChange={onChange}
                    height="35px"
                    width="100%"
                    fontSize="24px"
                    mt="35px"
                >
                </TextInput>
            }
        </div>
    );
}

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
            return(<BookmarkIcon sx={{ color: "#65ba43", 'fontSize':{fontSize}}}/>);
    }
}

const Description = styled.div`

`

const TitleContainer = styled.div`
    cursor: pointer;
`

const TicketPanels = styled.div`
    display:flex;
    flex-direction: row;
    font-family: CircularStdBook;
`

const TicketMainPanel = styled.div`
    width: 637px;
`

const TicketSidePanel = styled.div`
    margin-left: 50px
`

const TicketType = styled.div`
    display: flex;
    flex-direction: row;
    gap: 7px;
    font-size: 13px;
    align-items: center;
    font-family: CircularStdBook;
    color: rgb(94, 108, 132);
`


export default TicketModal;