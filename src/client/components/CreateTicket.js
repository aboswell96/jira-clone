import React, {useState,useEffect} from 'react';
import styled from 'styled-components';

import { readFromDB, writeToDB} from '../../firebase/firebase';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import UserTile from './UserTile';

import StatusTile from './StatusTile';
import PriorityTile from './PriorityTile';

import TitleInput from './TitleInput';
import Button from './Button';
import TaskTypeSelect from './TaskTypeSelect';


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

const CreateTicket = (props) => {
    const [users, setUsers] = useState([{},{},{}]);
    const Unassigned = ["-1",{"firstName":'Unassigned','lastName':'','photo':'https://ibb.co/M9PdhH9'}];

    //Ticket Attributes
    const [issueType, setIssueType] = useState("story");
    const [status, setStatus] = useState("backlog");
    const [assignee, setAssignee] = useState(Unassigned);
    const [reporter, setReporter] = useState(Unassigned);
    const [priority, setPriority] = useState("low");

    const onCreate = () => {
        onWrite();
        props.handleClose();
    }

    //Read Users from DB after mount
    useEffect(() => {
        readFromDB('users',setUsers);
    }, []);

    const onWrite = () => {
        const newTicket= {
            'assignee': assignee[0],
            'description': 'temp',
            'lane': status,
            'priority': priority,
            'reporter': reporter,
            'title': 'new ticket',
            'type': issueType,
        }
        writeToDB('tickets/' + Math.floor(1000 + Math.random() * 9000), newTicket);
    }

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
                            {/* <TicketType>
                                {RenderTicketTypeIcon("story")}
                                {"STORY" + "-" + Math.floor(1000 + Math.random() * 9000)}
                            </TicketType> */}
                            <Title
                                title={"Enter a title here..."}
                                onWrite={onWrite}
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#172B4D', 'fontFamily':'CircularStdMedium', 'marginLeft':'3px'}}>Description</span>
                            <Description
                                description={""}
                                onWrite={onWrite}
                            />               
                        </TicketMainPanel>
                        <TicketSidePanel>
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Issue Type</span>
                            <TaskTypeSelect
                                issueType={issueType}
                                setIssueType={setIssueType}
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Status</span>
                            <StatusTile
                                status={status}
                                setStatus={setStatus}
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Assignee</span>
                            <UserTile
                                user={assignee}
                                setUser={setAssignee}
                                users={Object.entries(users).concat([Unassigned])}
                                field='assignee'
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Reporter</span>
                            <UserTile
                                user={reporter}
                                setUser={setReporter}
                                users={Object.entries(users).concat([Unassigned])}
                                field='reporter'
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Priority</span>
                            <PriorityTile
                                priority={priority}
                                setPriority={setPriority}
                            />
                        </TicketSidePanel>
                    </TicketPanels>
                    <div style={{'margin-bottom':'15px'}}>
                        <Button
                            text="Create"
                            bgColor="#0052cc"
                            color="white"
                            hoverColor="#005eeb"
                            onClick={onCreate}
                        />
                        <Button
                            text="Cancel"
                            hoverColor="#dfe1e6"
                            onClick={props.handleClose}
                        />
                    </div>
                </Box>
            </Modal>
        );
}

const Description = (props) => {

    const [value, setValue] = useState(props.description);
    const onChange = (e) => {
        setValue(e.target.value);
    }

    return(
            <TitleInput
                value={value}
                onChange={onChange}
                height="35px"
                width="100%"
                fontSize="15px"
                mt="1px"
                placeholder={"Enter a description here..."}
            >
            </TitleInput>
    );
}

const Title = (props) => {

    const [value, setValue] = useState(props.title);

    const onChange = (e) => {

        setValue(e.target.value);
    }

    return(
        <TitleInput
            value={value}
            onChange={onChange}
            height="35px"
            width="100%"
            fontSize="24px"
            mt="35px"
        >
        </TitleInput>
    );
}

const TicketPanels = styled.div`
    display:flex;
    flex-direction: row;
    font-family: CircularStdBook;
`

const TicketMainPanel = styled.div`
    width: 65%;
`

const TicketSidePanel = styled.div`
    margin-left: 50px;
    width: 35%;
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


export default CreateTicket;