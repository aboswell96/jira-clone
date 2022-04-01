import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { readFromDB, writeToDB } from '../firebase/firebase';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import UserTile from './UserTile';

import StatusTile from './StatusTile';
import PriorityTile from './PriorityTile';

import TitleInput from './TitleInput';
import Button from '../common/Button';
import IssueTypeTile from './IssueTypeTile';

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
  bgcolor: 'background.paper',
  boxShadow: 24,
  verticalAlign: 'top',
  transform: 'translate(-50%, -50%)',
};

const CreateTicket = (props) => {
  const [users, setUsers] = useState([[]]);
  const UNASSIGNED = [
    '-1',
    { firstName: 'Unassigned', lastName: '', photo: 'https://ibb.co/M9PdhH9' },
  ];

  //Ticket Attributes
  const [issueType, setIssueType] = useState('story');
  const [status, setStatus] = useState('backlog');
  const [assignee, setAssignee] = useState(UNASSIGNED);
  const [reporter, setReporter] = useState(UNASSIGNED);
  const [priority, setPriority] = useState('low');

  const [title, setTitle] = useState('Enter a title...');
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const [description, setDescription] = useState('');
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onAssigneeChange = (newVal) => {
    if (newVal === '-1') {
      setAssignee(UNASSIGNED);
    } else {
      setAssignee(
        Object.entries(users).filter((user) => parseInt(user[0]) == newVal)[0]
      );
    }
  };

  const OnReporterChange = (newVal) => {
    if (newVal === '-1') {
      setReporter(UNASSIGNED);
    } else {
      setReporter(
        Object.entries(users).filter((user) => parseInt(user[0]) == newVal)[0]
      );
    }
  };

  const onCreate = () => {
    onWrite();
    props.handleClose();
  };

  //Read Users from DB after mount
  useEffect(() => {
    readFromDB('users', setUsers);
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const onWrite = () => {
    const newTicket = {
      assignee: assignee[0],
      description: description,
      lane: status,
      priority: priority,
      reporter: reporter,
      title: title,
      type: issueType,
    };
    writeToDB('tickets/' + Math.floor(1000 + Math.random() * 9000), newTicket);
  };

  return (
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
            <Title value={title} onChange={onTitleChange} onWrite={onWrite} />
            <span
              style={{
                display: 'block',
                paddingTop: '25px',
                color: '#172B4D',
                fontFamily: 'CircularStdMedium',
                marginLeft: '3px',
              }}
            >
              Description
            </span>
            <Description
              value={description}
              onWrite={onWrite}
              onChange={onDescriptionChange}
            />
          </TicketMainPanel>
          <TicketSidePanel>
            <span
              style={{
                display: 'block',
                paddingTop: '25px',
                color: '#5e6c84',
                fontSize: '12.5px',
                fontFamily: 'CircularStdBold',
              }}
            >
              Issue Type
            </span>
            <IssueTypeTile issueType={issueType} setIssueType={setIssueType} />
            <span
              style={{
                display: 'block',
                paddingTop: '25px',
                color: '#5e6c84',
                fontSize: '12.5px',
                fontFamily: 'CircularStdBold',
              }}
            >
              Status
            </span>
            <StatusTile status={status} setStatus={setStatus} />
            <span
              style={{
                display: 'block',
                paddingTop: '25px',
                color: '#5e6c84',
                fontSize: '12.5px',
                fontFamily: 'CircularStdBold',
              }}
            >
              Assignee
            </span>
            <UserTile
              user={assignee}
              setUser={onAssigneeChange}
              users={Object.entries(users).concat([UNASSIGNED])}
              field="assignee"
            />
            <span
              style={{
                display: 'block',
                paddingTop: '25px',
                color: '#5e6c84',
                fontSize: '12.5px',
                fontFamily: 'CircularStdBold',
              }}
            >
              Reporter
            </span>
            <UserTile
              user={reporter}
              setUser={OnReporterChange}
              users={Object.entries(users).concat([UNASSIGNED])}
              field="reporter"
            />
            <span
              style={{
                display: 'block',
                paddingTop: '25px',
                color: '#5e6c84',
                fontSize: '12.5px',
                fontFamily: 'CircularStdBold',
              }}
            >
              Priority
            </span>
            <PriorityTile priority={priority} setPriority={setPriority} />
          </TicketSidePanel>
        </TicketPanels>
        <div style={{ 'margin-bottom': '15px' }}>
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
};

const Description = (props) => {
  return (
    <TitleInput
      value={props.value}
      onChange={props.onChange}
      height="35px"
      width="100%"
      fontSize="15px"
      mt="1px"
      placeholder={'Enter a description here...'}
    ></TitleInput>
  );
};

const Title = (props) => {
  return (
    <TitleInput
      value={props.value}
      onChange={props.onChange}
      height="35px"
      width="100%"
      fontSize="24px"
      mt="35px"
    ></TitleInput>
  );
};

const TicketPanels = styled.div`
  display: flex;
  flex-direction: row;
  font-family: CircularStdBook;
`;

const TicketMainPanel = styled.div`
  width: 65%;
`;

const TicketSidePanel = styled.div`
  margin-left: 50px;
  width: 35%;
`;

export default CreateTicket;
