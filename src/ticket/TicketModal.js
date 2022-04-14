import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
  readFromDB,
  queryCommentsDB,
  updateDB,
  saveComment,
  deleteNodeDB,
} from '../firebase/firebase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import UserTile from './UserTile';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BugReportIcon from '@mui/icons-material/BugReport';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import StatusTile from './StatusTile';
import PriorityTile from './PriorityTile';
import Tooltip from '@mui/material/Tooltip';
import TitleInput from './TitleInput';
import Button from '../common/Button';
import moment from 'moment';
import AddComment from './AddComment';
import IssueTypeTile from './IssueTypeTile';
import { Skeleton } from '@mui/material';
import { ThemeContext } from '../nav/Project';

const UNASSIGNED = [
  '-1',
  { firstName: 'Unassigned', lastName: '', photo: 'https://ibb.co/M9PdhH9' },
];

const TicketModal = (props) => {
  const darkTheme = useContext(ThemeContext);
  //States
  const [ticket, setTicket] = useState({
    assignee: 64980,
    description: 'temp Description 2',
    lane: 'inDevelopment',
    priority: 'high',
    reporter: 64980,
    title: 'Add ticket search',
    type: 'story',
  });

  const [loading, setLoading] = useState(true);

  //Ticket Attributes
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [issueType, setIssueType] = useState(ticket.type);
  const [status, setStatus] = useState(ticket.lane);
  const [assignee, setAssignee] = useState(
    Object.entries(props.users).filter(
      (user) => parseInt(user[0]) === ticket.assignee
    )
  );
  const [reporter, setReporter] = useState(
    Object.entries(props.users).filter(
      (user) => parseInt(user[0]) === ticket.reporter
    )
  );
  const [priority, setPriority] = useState(ticket.priority);
  const [comments, setComments] = useState([]);
  const [timestamp, setTimestamp] = useState(new Date().getTime());

  //Life Cycle Methods
  useEffect(() => {
    setLoading(true);
    readFromDB('tickets/' + props.ticket[0], setTicket);
    queryCommentsDB(parseInt(props.ticket[0]), setComments);
  }, [props.ticket]);

  //Fires when the ticket passed in by BoardView changes eg. user clicks on a ticket
  useEffect(() => {
    setTitle(ticket.title);
    setDescription(ticket.description);
    setIssueType(ticket.type);
    setStatus(ticket.lane);

    const newAssignee = Object.entries(props.users).filter(
      (user) => parseInt(user[0]) === ticket.assignee
    );
    if (newAssignee.length > 0) {
      setAssignee(
        Object.entries(props.users).filter(
          (user) => parseInt(user[0]) === ticket.assignee
        )[0]
      );
    } else {
      setAssignee([
        '-1',
        {
          firstName: 'Unassigned',
          lastName: '',
          photo: 'https://ibb.co/M9PdhH9',
        },
      ]);
    }
    const newReporter = Object.entries(props.users).filter(
      (user) => parseInt(user[0]) === ticket.reporter
    );
    if (newReporter.length > 0) {
      setReporter(
        Object.entries(props.users).filter(
          (user) => parseInt(user[0]) === ticket.reporter
        )[0]
      );
    } else {
      setReporter([
        '-1',
        {
          firstName: 'Unassigned',
          lastName: '',
          photo: 'https://ibb.co/M9PdhH9',
        },
      ]);
    }
    setPriority(ticket.priority);
    setTimestamp(ticket.lastUpdated);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [ticket, props.users]);

  //Event Handlers

  const OnIssueChange = (newVal) => {
    onWrite('type', newVal);
    setIssueType(newVal);
  };

  const OnStatusChange = (newVal) => {
    onWrite('lane', newVal);
    setStatus(newVal);
  };

  const OnAssigneeChange = (newVal) => {
    onWrite('assignee', parseInt(newVal));
    if (newVal === '-1') {
      setAssignee(UNASSIGNED);
    } else {
      setAssignee(
        Object.entries(props.users).filter((user) => user[0] === newVal)[0]
      );
    }
  };

  const OnReporterChange = (newVal) => {
    onWrite('reporter', parseInt(newVal));
    if (newVal === '-1') {
      setReporter(UNASSIGNED);
    } else {
      setReporter(
        Object.entries(props.users).filter((user) => user[0] === newVal)[0]
      );
    }
  };

  const OnPriorityChange = (newVal) => {
    onWrite('priority', newVal);
    setPriority(newVal);
  };

  //To-do: chance to event listener since this query is not gauranteed to find the new comment
  const OnSubmitComment = (commentMsg) => {
    saveComment(props.ticket[0], commentMsg);
    queryCommentsDB(parseInt(props.ticket[0]), setComments);
  };

  const onWrite = (path, newValue) => {
    updateDB('tickets/' + props.ticket[0] + '/' + path, newValue);
    updateDB(
      'tickets/' + props.ticket[0] + '/lastUpdated',
      new Date().getTime()
    );
    setTimestamp(new Date().getTime());
  };

  const onDeleteTicket = () => {
    deleteNodeDB('tickets/' + props.ticket[0]);
    deleteNodeDB('comments/' + props.ticket[0]);
    props.handleClose();
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    pt: 25 / 8,
    pr: 35 / 8,
    pb: 60 / 8,
    pl: 35 / 8,
    width: '55%',
    minWidth: 550,
    bgcolor: darkTheme ? '#010409' : 'background.paper',
    boxShadow: 24,
    verticalAlign: 'top',
    transform: 'translate(-50%, -50%)',
    border: darkTheme ? '2px solid white' : '',
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <TicketType darkTheme={darkTheme}>
            {RenderTicketTypeIcon(issueType)}
            {issueType.toUpperCase() + '-' + props.ticket[0]}
          </TicketType>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              'justify-content': 'flex-end',
              gap: '10px',
            }}
          >
            <div
              style={{ width: 30, 'margin-right': '0', cursor: 'pointer' }}
              onClick={onDeleteTicket}
            >
              <Tooltip title="Delete Ticket" placement="bottom">
                <DeleteOutlineOutlinedIcon
                  color="action"
                  sx={{ fontSize: 30, mr: 0 }}
                />
              </Tooltip>
            </div>
            <div
              style={{ width: 30, 'margin-right': '0', cursor: 'pointer' }}
              onClick={props.handleClose}
            >
              <Tooltip title="Close" placement="bottom">
                <CloseIcon color="action" sx={{ fontSize: 30, mr: 0 }} />
              </Tooltip>
            </div>
          </div>
        </div>
        {loading ? (
          <Skeleton
            variant="rectangle"
            height="39px"
            sx={{ bgcolor: darkTheme ? 'grey.900' : '' }}
          />
        ) : (
          <Title title={title} onWrite={onWrite} />
        )}
        <TicketPanels>
          <TicketMainPanel>
            <TextMain darkTheme={darkTheme}>Last updated</TextMain>
            {loading ? (
              <Skeleton
                variant="text"
                sx={{ bgcolor: darkTheme ? 'grey.900' : '' }}
              />
            ) : (
              <div
                style={{
                  fontSize: '14.5px',
                  fontFamily: 'CircularStdBook',
                  color: darkTheme ? 'white' : '#42526E',
                  marginTop: '2px',
                  marginLeft: '3px',
                }}
              >
                {moment(timestamp).calendar()}
              </div>
            )}
            <TextMain darkTheme={darkTheme}>Description</TextMain>
            {loading ? (
              <Skeleton
                variant="text"
                sx={{ bgcolor: darkTheme ? 'grey.900' : '' }}
              />
            ) : (
              <Description description={description} onWrite={onWrite} />
            )}
            <TextMain darkTheme={darkTheme}>Comments</TextMain>
            {loading ? (
              <Skeleton
                variant="text"
                sx={{ bgcolor: darkTheme ? 'grey.900' : '' }}
              />
            ) : (
              <Comments
                comments={
                  comments?.length > 0
                    ? comments.sort((a, b) => {
                        return a.timestamp < b.timestamp ? -1 : 1;
                      })
                    : []
                }
                users={props.users}
                onSubmit={OnSubmitComment}
              />
            )}
          </TicketMainPanel>
          <TicketSidePanel>
            <TextSub darkTheme={darkTheme}>Issue Type</TextSub>
            {loading ? (
              <Skeleton
                variant="rectangle"
                width="169px"
                height="32px"
                sx={{ bgcolor: darkTheme ? 'grey.900' : '' }}
              />
            ) : (
              <IssueTypeTile
                issueType={issueType}
                setIssueType={OnIssueChange}
              />
            )}
            <TextSub darkTheme={darkTheme}>Status</TextSub>
            {loading ? (
              <Skeleton
                variant="rectangle"
                width="169px"
                height="32px"
                sx={{ bgcolor: darkTheme ? 'grey.900' : '' }}
              />
            ) : (
              <StatusTile status={status} setStatus={OnStatusChange} />
            )}
            <TextSub darkTheme={darkTheme}>Assignee</TextSub>
            {loading ? (
              <Skeleton
                variant="rectangle"
                width="169px"
                height="32px"
                sx={{ bgcolor: darkTheme ? 'grey.900' : '' }}
              />
            ) : (
              <UserTile
                user={assignee}
                setUser={OnAssigneeChange}
                users={Object.entries(props.users).concat([UNASSIGNED])}
                field="assignee"
              />
            )}
            <TextSub darkTheme={darkTheme}>Reporter</TextSub>
            {loading ? (
              <Skeleton
                variant="rectangle"
                width="169px"
                height="32px"
                sx={{ bgcolor: darkTheme ? 'grey.900' : '' }}
              />
            ) : (
              <UserTile
                user={reporter}
                setUser={OnReporterChange}
                users={Object.entries(props.users).concat([UNASSIGNED])}
                field="reporter"
              />
            )}
            <TextSub darkTheme={darkTheme}>Priority</TextSub>
            {loading ? (
              <Skeleton
                variant="rectangle"
                width="169px"
                height="32px"
                sx={{ bgcolor: darkTheme ? 'grey.900' : '' }}
              />
            ) : (
              <PriorityTile
                priority={priority}
                setPriority={OnPriorityChange}
              />
            )}
          </TicketSidePanel>
        </TicketPanels>
      </Box>
    </Modal>
  );
};

const Comments = (props) => {
  const darkTheme = useContext(ThemeContext);
  const [value, setValue] = useState('');
  const [isEditting, setIsEditting] = useState(false);

  const onSubmit = () => {
    setIsEditting(false);
    props.onSubmit(value);
    setValue('');
  };

  const onCancel = () => {
    setIsEditting(false);
    setValue('');
  };

  const onChange = (e) => {
    if (!isEditting) {
      setIsEditting(true);
    }
    setValue(e.target.value);
  };

  const comments = props.comments.map((comment, i) => {
    const user = Object.entries(props.users).filter(
      (user) => parseInt(user[0]) === comment.userId
    )[0];
    return (
      <div
        style={{
          display: 'flex',
          'flex-direction': 'row',
          gap: '25px',
        }}
        key={i}
      >
        <div>
          <UserAvatar img={user[1].photo} height={'32px'} width={'32px'} />
        </div>
        <div style={{ display: 'flex', 'flex-direction': 'column' }}>
          <div
            style={{ display: 'flex', 'flex-direction': 'row', gap: '12px' }}
          >
            <div
              style={{
                fontSize: '15px',
                fontFamily: 'CircularStdMedium',
                color: darkTheme ? 'white' : '#42526E',
              }}
            >
              {user[1].firstName + ' ' + user[1].lastName}
            </div>
            <div
              style={{
                fontSize: '14.5px',
                fontFamily: 'CircularStdBook',
                color: darkTheme ? 'white' : '#42526E',
              }}
            >
              {moment(comment.timestamp).calendar()}
            </div>
          </div>
          <div
            style={{
              fontSize: '15px',
              fontFamily: 'CircularStdBook',
              color: darkTheme ? 'white' : '#172B4D',
              paddingTop: '10px',
            }}
          >
            {comment.msg}
          </div>
        </div>
      </div>
    );
  });

  const addComment = (
    <div style={{ display: 'flex', 'flex-direction': 'row', gap: '25px' }}>
      <UserAvatar
        img={'https://i.ibb.co/vhJVFpQ/joey-tribbiani-3.jpg'}
        height={'32px'}
        width={'32px'}
      />
      <div
        style={{
          display: 'flex',
          'flex-direction': 'column',
          gap: '0',
          width: '100%',
        }}
      >
        <AddComment
          value={value}
          onChange={onChange}
          height="44px"
          width="90%"
          fontSize="15px"
          placeholder="Add a comment..."
          darkTheme={darkTheme}
        />
        {isEditting && (
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
              onClick={() => onCancel()}
            />
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        gap: '15px',
        paddingTop: '25px',
      }}
    >
      {comments}
      {addComment}
    </div>
  );
};

const Description = (props) => {
  const darkTheme = useContext(ThemeContext);
  const [isEditting, setIsEditting] = useState(false);
  const [value, setValue] = useState(props.description);
  const defaultVal = props.description;

  useEffect(() => {
    setValue(props.description);
  }, [props.description]);

  const onChange = (e) => {
    if (!isEditting) {
      setIsEditting(true);
    }
    setValue(e.target.value);
  };

  const onSave = () => {
    setIsEditting(false);
    props.onWrite('description', value);
  };

  const onCancel = () => {
    setIsEditting(false);
    setValue(defaultVal);
  };

  return (
    <div>
      <TitleInput
        value={value}
        onChange={onChange}
        height="100px"
        width="100%"
        fontSize="15px"
        mt="1px"
        darkTheme={darkTheme}
      ></TitleInput>
      {isEditting && (
        <div>
          <Button
            text="Save changes"
            bgColor="#0052cc"
            color="white"
            hoverColor="#005eeb"
            onClick={() => onSave()}
          />
          <Button
            text="Cancel"
            hoverColor="#dfe1e6"
            onClick={() => onCancel()}
          />
        </div>
      )}
    </div>
  );
};

const Title = (props) => {
  const darkTheme = useContext(ThemeContext);
  const [isEditting, setIsEditting] = useState(false);
  const [value, setValue] = useState(props.title);
  const defaultVal = props.title;

  useEffect(() => {
    setValue(props.title);
  }, [props.title]);

  const onChange = (e) => {
    if (!isEditting) {
      setIsEditting(true);
    }
    setValue(e.target.value);
  };

  const onSave = () => {
    setIsEditting(false);
    props.onWrite('title', value);
  };

  const onCancel = () => {
    setIsEditting(false);
    setValue(defaultVal);
  };

  return (
    <div>
      <TitleInput
        value={value}
        onChange={onChange}
        minHeight="35px"
        width="100%"
        fontSize={value.length > 60 ? '18px' : '24px'}
        darkTheme={darkTheme}
      ></TitleInput>
      {isEditting && (
        <div>
          <Button
            text="Save changes"
            bgColor="#0052cc"
            color="white"
            hoverColor="#005eeb"
            onClick={() => onSave()}
          />
          <Button
            text="Cancel"
            hoverColor="#dfe1e6"
            onClick={() => onCancel()}
          />
        </div>
      )}
    </div>
  );
};

const RenderTicketTypeIcon = (type) => {
  const fontSize = 18;
  switch (type) {
    case 'story':
      return <BookmarkIcon sx={{ color: '#65ba43', fontSize: { fontSize } }} />;
    case 'task':
      return <CheckBoxIcon color="primary" sx={{ fontSize: { fontSize } }} />;
    case 'bug':
      return <BugReportIcon color="action" sx={{ fontSize: { fontSize } }} />;
    default:
      return <BookmarkIcon sx={{ color: '#65ba43', fontSize: { fontSize } }} />;
  }
};

const UserAvatar = styled.div`
  display: block;
  background-image: url(${(props) => props.img});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgb(235, 236, 240);
  height: ${(props) => props.height};
  width: ${(props) => props.height};
  border-radius: 100%;
  flex-shrink: 0;
`;

const TicketPanels = styled.div`
  display: flex;
  flex-direction: row;
  font-family: CircularStdBook;
`;

const TicketMainPanel = styled.div`
  width: 65%;
  paddingtop: 35px;
`;

const TicketSidePanel = styled.div`
  margin-left: 50px;
  width: 35%;
`;

const TicketType = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
  font-size: 13px;
  align-items: center;
  font-family: CircularStdBook;
  color: ${(props) => (props.darkTheme ? 'white' : '#5e6c84')};
`;

const TextMain = styled.span`
  display: block;
  padding-top: 25px;
  color: ${(props) => (props.darkTheme ? 'white' : '#172b4d')};
  font-family: CircularStdMedium;
  margin-left: 3px;
`;

const TextSub = styled.span`
  display: block;
  padding-top: 25px;
  color: #5e6c84;
  font-size: 12.5px;
  font-family: CircularStdBold;
  color: ${(props) => (props.darkTheme ? 'white' : '#172b4d')};
`;

export default TicketModal;
