import React, {useState,useEffect, useMemo} from 'react';
import styled from 'styled-components';

import { readFromDB, queryCommentsDB, updateDB, saveComment } from '../../firebase/firebase';

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
import moment from 'moment';
import AddComment from './AddComment';
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

const TicketModal = (props) => {

    const Unassigned = ["-1",{"firstName":'Unassigned','lastName':'','photo':'https://ibb.co/M9PdhH9'}];
    const init = {
        assignee: 64980,
        description: "temp Description 2",
        lane: "inDevelopment",
        priority: "high",
        reporter: 64980,
        title: "Add ticket search",
        type: "story",
    };

    useEffect(() => {
        readFromDB('tickets/' + props.ticket[0], setTicketTest)
        queryCommentsDB(parseInt(props.ticket[0]), setComments);
    },[props.ticket])

    const [ticketTest, setTicketTest] = useState(init);

    //Fires when the ticket passed in by BoardView changes eg. user clicks on a ticket
    useEffect(() => {
        setIssueType(ticketTest.type);
        setStatus(ticketTest.lane);

        const newAssignee = Object.entries(props.users).filter(user => user[0] == ticketTest.assignee);
        if(newAssignee.length > 0){
            setAssignee(Object.entries(props.users).filter(user => user[0] == ticketTest.assignee)[0]);
        } else {
            setAssignee(["-1",{"firstName":'Unassigned','lastName':'','photo':'https://ibb.co/M9PdhH9'}]);
        }

        const newReporter = Object.entries(props.users).filter(user => user[0] == ticketTest.reporter);
        if(newReporter.length > 0){
            setReporter(Object.entries(props.users).filter(user => user[0] == ticketTest.reporter)[0]);
        } else {
            setReporter(["-1",{"firstName":'Unassigned','lastName':'','photo':'https://ibb.co/M9PdhH9'}]);
        }
        setPriority(ticketTest.priority);
    }, [ticketTest, props.users])

    //Ticket Attributes
    const [issueType, setIssueType] = useState(ticketTest.type);
    const [status, setStatus] = useState(ticketTest.lane);
    const [assignee, setAssignee] = useState(Object.entries(props.users).filter(user => user[0] == ticketTest.assignee));
    const [reporter, setReporter] = useState(Object.entries(props.users).filter(user => user[0] == ticketTest.reporter));
    const [priority, setPriority] = useState(ticketTest.priority);
    const [comments, setComments] = useState([]);

    const OnIssueChange = (newVal) => {
        onWrite('type',newVal);
        setIssueType(newVal);
    }

    const OnStatusChange = (newVal) => {
        onWrite('lane',newVal);
        setStatus(newVal);
    }

    const OnAssigneeChange = (newVal) => {
        onWrite('assignee',newVal);
        if(newVal === '-1') {
            setAssignee(Unassigned);
        } else {
            setAssignee(Object.entries(props.users).filter(user => user[0] == newVal)[0]);
        }
    }

    const OnReporterChange = (newVal) => {
        onWrite('reporter',newVal);
        if(newVal === '-1') {
            setReporter(Unassigned);
        } else {
            setReporter(Object.entries(props.users).filter(user => user[0] == newVal)[0]);
        }
    }

    const OnPriorityChange = (newVal) => {
        onWrite('priority',newVal);
        setPriority(newVal);
    }

    //To-do: chance to event listener since this query is not gauranteed to find the new comment
    const OnSubmitComment = (commentMsg) => {
        saveComment(props.ticket[0], commentMsg);
        queryCommentsDB(parseInt(props.ticket[0]), setComments);
    }

    const onWrite = (path, newValue) => {
        updateDB('tickets/' + props.ticket[0] + "/" + path, newValue, props.onCommit);
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
                            <TicketType>
                                {RenderTicketTypeIcon(issueType)}
                                {issueType.toUpperCase() + "-" + props.ticket[0]}
                            </TicketType>
                            <Title
                                title={ticketTest.title}
                                onWrite={onWrite}
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#172B4D', 'fontFamily':'CircularStdMedium', 'marginLeft':'3px'}}>Description</span>
                            <Description
                                description={ticketTest.description}
                                onWrite={onWrite}
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#172B4D','fontFamily':'CircularStdMedium','marginLeft':'3px'}}>Comments</span>
                            <Comments
                                comments={(comments && Object.keys(comments).length>0 ) ? Object.values(comments).sort((a,b) => { return a.timestamp < b.timestamp ? -1 : 1}) : []}     //Sorted for now until we can add sort to Firebase queries
                                users={props.users}
                                onSubmit={OnSubmitComment}
                            />
                        </TicketMainPanel>
                        <TicketSidePanel>
                        <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Issue Type</span>
                            <TaskTypeSelect
                                issueType={issueType}
                                setIssueType={OnIssueChange}
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Status</span>
                            <StatusTile
                                status={status}
                                setStatus={OnStatusChange}
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Assignee</span>
                            <UserTile
                                user={assignee}
                                setUser={OnAssigneeChange}
                                users={Object.entries(props.users).concat([Unassigned])}
                                field='assignee'
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Reporter</span>
                            <UserTile
                                user={reporter}
                                setUser={OnReporterChange}
                                users={Object.entries(props.users).concat([Unassigned])}
                                field='reporter'
                            />
                            <span style={{'display':'block','paddingTop':'25px', 'color':'#5e6c84','fontSize':'12.5px', 'fontFamily':'CircularStdBold'}}>Priority</span>
                            <PriorityTile
                                priority={priority}
                                setPriority={OnPriorityChange}
                            />
                        </TicketSidePanel>
                    </TicketPanels>
                </Box>
            </Modal>
        );
}

const Comments = (props) => {

    const [value, setValue] = useState("");
    const [isEditting, setIsEditting] = useState(false);

    const onSubmit = () => {
        setIsEditting(false);
        props.onSubmit(value);
        setValue("");
        //write to db
    }

    const onCancel = () => {
        setIsEditting(false);
        setValue("");
    }
    
    const onChange = (e) => {

        if(!isEditting) {
            setIsEditting(true);
        }

        setValue(e.target.value);
    }

    const comments = props.comments.map((comment,i) => {

        const user = Object.entries(props.users).filter(user => user[0] == comment.userId)[0];
        return(
            <div style={{'display':'flex', 'flex-direction':'row', 'gap':'25px'}}>
                <div>
                    <UserAvatar
                        img={user[1].photo}
                        height={'32px'}
                        width={'32px'}
                    />
                </div>
                <div style={{'display':'flex', 'flex-direction':'column'}}>
                    <div style={{'display':'flex', 'flex-direction':'row','gap':'12px'}}>
                        <div style={{"fontSize":"15px", 'fontFamily':'CircularStdMedium', 'color':'#42526E'}}>
                            {user[1].firstName + " " + user[1].lastName}
                        </div>
                        <div style={{"fontSize":"14.5px", 'fontFamily':'CircularStdBook', 'color':'#42526E'}}>
                            {moment(comment.timestamp).calendar()}
                        </div>
                    </div>
                    <div style={{"fontSize":"15px", 'fontFamily':'CircularStdBook', 'color':'#172B4D', 'paddingTop':'10px'}} >
                        {comment.msg}
                    </div>
                </div>
            </div>
        );
    });

    const addComment =
                            <div style={{'display':'flex', 'flex-direction':'row', 'gap':'25px'}}>
                                <UserAvatar
                                    img={"https://i.ibb.co/vhJVFpQ/joey-tribbiani-3.jpg"}
                                    height={'32px'}
                                    width={'32px'}
                                />
                                <div style={{'display':'flex', 'flex-direction':'column', 'gap':'0', 'width':'100%'}} >
                                    <AddComment
                                        value={value}
                                        onChange={onChange}
                                        height="44px"
                                        width="90%"
                                        fontSize="15px"
                                        placeholder="Add a comment..."
                                    />
                                    {isEditting &&
                                    <div>
                                        <Button
                                            text="Save"
                                            bgColor="#0052cc"
                                            color="white"
                                            hoverColor="#005eeb"
                                            onClick={onSubmit}
                                        />
                                        <Button
                                            text="Cancel"
                                            hoverColor="#dfe1e6"
                                            onClick={()=>onCancel()}
                                        />
                                    </div>
                                    }
                                </div>
                            </div>
    return(
        <div style={{'display':'flex', 'flex-direction':'column', 'gap':'15px','paddingTop':'25px'}}>
            {comments}
            {addComment}
        </div>
    )
}

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
    flex-shrink: 0;
`

const Description = (props) => {

    const [isEditting, setIsEditting] = useState(false);
    const [value, setValue] = useState(props.description);
    const defaultVal = props.description;

    const onChange = (e) => {

        if(!isEditting) {
            setIsEditting(true);
        }

        setValue(e.target.value);
    }

    const onSave = () => {
        setIsEditting(false);
        props.onWrite('description', value);
    }

    const onCancel = () => {
        setIsEditting(false);
        setValue(defaultVal);
    }

    return(
        <div>
            <TitleInput
                value={value}
                onChange={onChange}
                height="35px"
                width="100%"
                fontSize="15px"
                mt="1px"
            >
            </TitleInput>
            {
                isEditting &&
                    <div>
                        <Button
                            text="Save changes"
                            bgColor="#0052cc"
                            color="white"
                            hoverColor="#005eeb"
                            onClick={()=>onSave()}
                        />
                        <Button
                            text="Cancel"
                            hoverColor="#dfe1e6"
                            onClick={()=>onCancel()}
                        />
                    </div>
                    
            }
        </div>
    );
}

const Title = (props) => {

    const [isEditting, setIsEditting] = useState(false);
    const [value, setValue] = useState(props.title);
    const defaultVal = props.title;

    const onChange = (e) => {

        if(!isEditting) {
            setIsEditting(true);
        }

        setValue(e.target.value);
    }

    const onSave = () => {
        setIsEditting(false);
        props.onWrite('title', value);
    }

    const onCancel = () => {
        setIsEditting(false);
        setValue(defaultVal);
    }

    return(
        <div>
            <TitleInput
                value={value}
                onChange={onChange}
                height="35px"
                width="100%"
                fontSize="24px"
                mt="35px"
            >
            </TitleInput>
            {
                isEditting &&
                    <div>
                        <Button
                            text="Save changes"
                            bgColor="#0052cc"
                            color="white"
                            hoverColor="#005eeb"
                            onClick={()=>onSave()}
                        />
                        <Button
                            text="Cancel"
                            hoverColor="#dfe1e6"
                            onClick={()=>onCancel()}
                        />
                    </div>
                    
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


export default TicketModal;