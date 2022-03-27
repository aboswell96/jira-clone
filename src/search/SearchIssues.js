import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextSearchBox from '../common/TextSearchBox';
import Tooltip from '@mui/material/Tooltip';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BugReportIcon from '@mui/icons-material/BugReport';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import ClipLoader from 'react-spinners/ClipLoader';

import { readFromDB } from '../firebase/firebase';

import { debounce } from 'lodash';

const style = {
  position: 'absolute',
  top: '0%',
  left: '0%',
  pt: 25 / 8,
  pr: 35 / 8,
  pb: 60 / 8,
  pl: 35 / 8,
  width: 530,
  height: '100%',
  bgcolor: '#0747a6',
  boxShadow: 24,
  verticalAlign: 'top',
};

const SearchIssuesModal = (props) => {
  const [searchInput, setSearchInput] = useState('');
  const [tickets, setTickets] = useState({});
  const [dbUsers, setDbUsers] = useState({});
  const [loading, setLoading] = useState(false);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    readFromDB('users', setDbUsers);
  }, []);

  const UpdateSearchResults = () => {
    if (!isDataLoaded) {
      readFromDB('tickets', setTickets);
      setLoading(false);
      setIsDataLoaded(true);
    }
  };

  //without useCallback we would create a new handler on every rerender
  //caused by setsearchinput which would fire the debounced eveny manyu times.
  //Usecallback returns a memorized version of the function that doesn't get recreated every render
  const handler = useCallback(debounce(UpdateSearchResults, 1000), []);

  const onChangeDebounce = (e) => {
    // perform any event related action here

    setSearchInput(e.target.value);
    if (!loading && !isDataLoaded) {
      setLoading(true);
    }

    handler();
  };

  const input = searchInput
    .toLowerCase()
    .replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  let filteredTickets = Object.entries(tickets).filter(
    (ticket) => ticket[1].title.toLowerCase().search(input) > -1
  );

  const Tickets = filteredTickets.map((ticket, i) => {
    const assignee = Object.entries(dbUsers).filter(
      (user) => parseInt(user[0]) === ticket[1].assignee
    );
    return (
      <TicketCard key={i}>
        {ticket[1].title}
        <TicketIcons>
          {RenderTicketTypeIcon(ticket[1].type)}
          {RenderTicketSeverityIcon(ticket[1].priority)}
          {assignee[0] && (
            <Tooltip
              title={assignee[0][1].firstName + ' ' + assignee[0][1].lastName}
              placement="top"
            >
              <UserAvatar
                img={assignee[0][1].photo}
                height={'24px'}
                width={'24px'}
              />
            </Tooltip>
          )}
        </TicketIcons>
      </TicketCard>
    );
  });

  return (
    <Container>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextSearchBox
            value={searchInput}
            onChange={onChangeDebounce}
            width="500px"
            placeholder="Search for issues by description or number..."
          />
          <Spinner>
            {loading && (
              <ClipLoader color="white" loading={loading} size={100} />
            )}
          </Spinner>
          <Results>
            {Tickets.length ? Tickets : isDataLoaded ? <NoResults /> : ''}
          </Results>
        </Box>
      </Modal>
    </Container>
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
      return <BookmarkIcon color="success" sx={{ fontSize: { fontSize } }} />;
  }
};

const RenderTicketSeverityIcon = (priority) => {
  var color = '';
  const fontSize = 18;
  switch (priority) {
    case 'sev2':
      color = '#cd1316';
      break;
    case 'sev1':
      color = '#e97f33';
      break;
    case 'high':
      color = '#57a55a';
      break;
    case 'low':
      color = '#2d8738';
      break;
    default:
      color = '#2d8738';
  }

  if (priority === 'sev2' || priority === 'sev1') {
    return (
      <ArrowUpwardIcon sx={{ color: { color }, fontSize: { fontSize } }} />
    );
  } else {
    return (
      <ArrowDownwardIcon sx={{ color: { color }, fontSize: { fontSize } }} />
    );
  }
};

const Container = styled.div`
  background-color: #0747a6;
`;

const NoResults = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        margin: 'auto',
        color: 'white',
        fontSize: '30px',
      }}
    >
      <SearchOffIcon sx={{ margin: 'auto', fontSize: '30px' }} />
      <div style={{ margin: 'auto' }}>No Results</div>
    </div>
  );
};

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
  color: #172b4d;
  width: 350px;

  &:hover {
    background-color: rgb(235, 236, 240);
  }
`;

const TicketIcons = styled.div`
  display: flex;
`;

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
  margin-left: auto;

  ${({ active }) =>
    active &&
    `
        outline: 3px solid #4c9aff;
    `}
`;

const Results = styled.div`
  width: 350px;
  margin: auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Spinner = styled.div`
  width: 100px;
  margin: auto;
  margin-top: 35px;
`;

export default SearchIssuesModal;
