import React, {useState,useEffect} from 'react';
import styled from 'styled-components';

import { readFromDB} from '../../firebase/firebase';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import UserTile from './UserTile';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BugReportIcon from '@mui/icons-material/BugReport';
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

    useEffect(() => {
        readFromDB('users',setUsers);
    }, []);

    useEffect( ()=> {
        console.log("remount");
    },[])

    const Unassigned = ["-1",{"firstName":'Unassigned','lastName':'','photo':'https://ibb.co/M9PdhH9'}];


    const onWrite = (path, newValue) => {
        // updateDB('tickets/' + props.ticket[0] + "/" + path, newValue, props.onCommit);
    }

    console.log("render");

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
                                type={"story"}
                                onWrite={onWrite}
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Status</span>
                            <StatusTile
                                status={"backlog"}
                                onWrite={onWrite}
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Assignee</span>
                            <UserTile
                                user={Unassigned}
                                users={Object.entries(users).concat([Unassigned])}
                                onWrite={onWrite}
                                field='assignee'
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Reporter</span>
                            <UserTile
                                user={Unassigned}
                                users={Object.entries(users).concat([Unassigned])}
                                onWrite={onWrite}
                                field='reporter'
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Priority</span>
                            <PriorityTile
                                priority={"low"}
                                onWrite={onWrite}
                            />
                        </TicketSidePanel>
                    </TicketPanels>
                    <div style={{'margin-bottom':'15px'}}>
                        <Button
                            text="Create"
                            bgColor="#0052cc"
                            color="white"
                            hoverColor="#005eeb"
                            onClick={props.handleClose}
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