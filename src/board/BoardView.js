import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import TextSearchBox from '../common/TextSearchBox';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Divider from '@mui/material/Divider';
import BugReportIcon from '@mui/icons-material/BugReport';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Tooltip from '@mui/material/Tooltip';

import _ from 'lodash';

// import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import DropTarget from './DragAndDrop/DropTarget';
import DragDropContainer from './DragAndDrop/DragDropContainer';
import TicketModal from '../ticket/TicketModal';

import {
  addDBListener,
  readFromDB,
  writeToDB,
  updateDB,
} from '../firebase/firebase';

import ClipLoader from 'react-spinners/ClipLoader';

import { delay } from '../common/helpers';

const tempLanes = [
  {
    title: 'Backlog',
    code: 'backlog',
  },
  {
    title: 'In Development',
    code: 'inDevelopment',
  },
  {
    title: 'In Progress',
    code: 'inProgress',
  },
  {
    title: 'Done',
    code: 'done',
  },
];

const PRIORTY_MAPPING = [
  {
    title: 'Highest',
    code: 'sev2',
  },
  {
    title: 'Higher',
    code: 'sev1',
  },
  {
    title: 'Medium',
    code: 'high',
  },
  {
    title: 'Lowest',
    code: 'low',
  },
];

const ISSUE_MAPPING = [
  {
    title: 'Story',
    code: 'story',
  },
  {
    title: 'Task',
    code: 'task',
  },
  {
    title: 'Bug',
    code: 'bug',
  },
];

const BoardView = () => {
  const [searchInput, setSearchInput] = useState('');
  const [usersSelected, SetUsersSelected] = useState([]);
  const [myIssuesSelected, SetMyIssuesSelected] = useState(false);
  const [recentlyUpdatedSelected, SetRecentlyUpdatedSelected] = useState(false);
  const [loading, setLoading] = useState(true);

  const onChange = (e) => {
    setSearchInput(e.target.value);
  };

  const [dbUsers, setDbUsers] = useState([{}, {}, {}]);

  useEffect(() => {
    readFromDB('users', setDbUsers);
    delay(200).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    SetUsersSelected(createFilterStates(dbUsers));
  }, [dbUsers]);

  const createFilterStates = (users) => {
    let res = [];
    Object.entries(users).forEach((user) =>
      res.push({ id: user[0], isSelected: false })
    );
    return res;
  };

  const OnHeroClicked = (id) => {
    const newUsers = usersSelected.slice();
    let index = newUsers.findIndex((user) => user.id === id);
    if (index >= 0) {
      newUsers[index].isSelected = !newUsers[index].isSelected;
      SetUsersSelected(newUsers);
    }
  };

  const OnClearFiltersClicked = () => {
    SetUsersSelected(createFilterStates(dbUsers));
    setSearchInput('');
    SetMyIssuesSelected(false);
    SetRecentlyUpdatedSelected(false);
  };

  const OnMyIssuesClicked = () => {
    SetMyIssuesSelected(!myIssuesSelected);
  };

  const OnRecentlyUpdatedClicked = () => {
    SetRecentlyUpdatedSelected(!recentlyUpdatedSelected);
  };

  const bIsFiltered =
    searchInput.length ||
    usersSelected.some((user) => user.isSelected) ||
    myIssuesSelected ||
    recentlyUpdatedSelected;

  const userAvatars = Object.entries(dbUsers).map((user, i) => {
    if (loading) {
      return <ClipLoader color="#0747a6" loading={loading} size={28} key={i} />;
    }

    const isActive = usersSelected.some(
      (userr) => userr.isSelected && userr.id === user[0]
    );

    return (
      <Tooltip
        title={user[1].firstName + ' ' + user[1].lastName}
        placement="top"
        key={i}
      >
        <UserAvatar
          img={user[1].photo}
          onClick={() => OnHeroClicked(user[0])}
          height={'32px'}
          width={'32px'}
          active={isActive}
        />
      </Tooltip>
    );
  });

  return (
    <div style={{ marginTop: '30px' }}>
      <BoardFilters>
        <TextSearchBox value={searchInput} onChange={onChange} width="160px" />
        <UserAvatars>{userAvatars}</UserAvatars>
        <BoardFilter onClick={OnMyIssuesClicked} active={myIssuesSelected}>
          Only My Issues
        </BoardFilter>
        <BoardFilter
          onClick={OnRecentlyUpdatedClicked}
          active={recentlyUpdatedSelected}
        >
          Recently Updated
        </BoardFilter>
        {bIsFiltered && <Divider orientation="vertical" flexItem />}
        {bIsFiltered && (
          <ClearFilter onClick={OnClearFiltersClicked}>Clear All</ClearFilter>
        )}
      </BoardFilters>
      <Swimlanes
        searchInput={searchInput
          .toLowerCase()
          .replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')} //ignore regex characters so the search doesn't break
        usersSelected={usersSelected}
        isFiltered={bIsFiltered}
        myIssuesSelected={myIssuesSelected}
        recentlyUpdated={recentlyUpdatedSelected}
        users={dbUsers}
      />
    </div>
  );
};

const Swimlanes = (props) => {
  const [currentLaneHovered, setCurrentLaneHovered] = useState(-1);

  const [open, setOpen] = useState(false);
  const handleOpen = (ticket) => {
    setOpen(true);
    setTicketSelected(ticket);
  };
  // const handleClose = () => setOpen(false);
  const handleClose = () => {
    //TODO: Read Tickets here
    //setTicketSelected({});
    setOpen(false);
  };
  const [ticketSelected, setTicketSelected] = useState({});

  const [dbTickets, setDbTickets] = useState([]);

  useEffect(() => {
    readFromDB('tickets', setDbTickets);
    addDBListener(() => {
      readFromDB('tickets', setDbTickets);
    });
  }, []);

  //these fire on mount and update so it must have a condition to prevent infinite renders!
  const OnDragEnter = (e, i) => {
    if (i !== currentLaneHovered) {
      setCurrentLaneHovered(i);
    }
  };

  const OnDragLeave = (e, i) => {
    if (i !== -1) {
      setCurrentLaneHovered(-1);
    }
  };

  const onDrop = (e) => {
    const ticketObj = Object.entries(dbTickets).filter(
      (ticket) => ticket[0] === e.dragData.ticketId
    )[0];
    const ticketLane = tempLanes.filter(
      (lane) => lane.code === ticketObj[1].lane
    )[0];

    if (ticketLane.code === e.dropData.laneTitle) {
      setCurrentLaneHovered(-1);
      return;
    }

    var newTicket = _.cloneDeep(ticketObj);
    newTicket[1].lane = e.dropData.laneTitle;
    writeToDB('tickets/' + newTicket[0], newTicket[1]);
    updateDB('tickets/' + newTicket[0] + '/lastUpdated', new Date().getTime());
    setCurrentLaneHovered(-1);
  };

  const swimLanes = tempLanes.map((lane, i) => {
    var filteredTickets = Object.entries(dbTickets).filter(
      (ticket) => ticket[1].lane === lane.code
    );
    const numMaxTickets = filteredTickets.length;

    if (props.recentlyUpdated) {
      //Show empty board for now if recently updated filter is selected
      // filteredTickets=[];
      const now = new Date().getTime();
      const k_24hours = 24 * 60 * 60 * 1000;
      //const k_1Minute = (60 * 1000);
      filteredTickets = filteredTickets.filter(
        (ticket) => now - ticket[1].lastUpdated < k_24hours
      );
    }
    //If any user filters are selected
    if (props.myIssuesSelected) {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket[1].assignee === 64980
      );
    } else if (props.usersSelected.some((user) => user.isSelected)) {
      const filteredUsers = props.usersSelected.filter(
        (user) => user.isSelected
      );
      filteredTickets = filteredTickets.filter((ticket) =>
        filteredUsers.some((user) => parseInt(user.id) === ticket[1].assignee)
      );
    }

    //Filter with the SearchBox
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket[1].title.toLowerCase().search(props.searchInput) > -1
    );

    const TicketComponents = filteredTickets.map((ticket, j) => {
      const assignee = Object.entries(props.users).filter(
        (user) => parseInt(user[0]) === ticket[1].assignee
      );
      return (
        <DragDropContainer
          targetKey="moveTicket"
          key={j}
          onDrop={onDrop}
          dragData={{ ticketId: ticket[0] }}
        >
          <TicketCard onClick={() => handleOpen(ticket)}>
            {ticket[1].title}
            <TicketIcons>
              <Tooltip
                title={
                  ISSUE_MAPPING.filter(
                    (type) => type.code === ticket[1].type
                  )[0].title
                }
                placement="top"
              >
                {RenderTicketTypeIcon(ticket[1].type)}
              </Tooltip>
              <Tooltip
                title={
                  PRIORTY_MAPPING.filter(
                    (p) => p.code === ticket[1].priority
                  )[0].title
                }
                placement="top"
              >
                {RenderTicketSeverityIcon(ticket[1].priority)}
              </Tooltip>
              {assignee[0] && (
                <Tooltip
                  title={
                    assignee[0][1].firstName + ' ' + assignee[0][1].lastName
                  }
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
        </DragDropContainer>
      );
    });

    return (
      <DropTarget
        key={i}
        targetKey="moveTicket"
        dropData={{ laneTitle: lane.code }}
        onDragEnter={(e) => OnDragEnter(e, i)}
        onDragLeave={(e) => OnDragLeave(e, i)}
        width="25%"
        minWidth="145px"
        height="auto"
      >
        <Swimlane isHovered={currentLaneHovered === i}>
          <SwimlaneHeader>
            {lane.title.toUpperCase() +
              ' ' +
              (props.isFiltered
                ? filteredTickets.length + ' of ' + numMaxTickets
                : filteredTickets.length)}
          </SwimlaneHeader>
          <SwimlaneBody>{TicketComponents}</SwimlaneBody>
        </Swimlane>
      </DropTarget>
    );
  });

  return (
    <BoardViewContainer>
      {swimLanes}
      {ticketSelected.length > 0 ? (
        <TicketModal
          open={open}
          handleClose={handleClose}
          ticket={ticketSelected}
          users={props.users}
        />
      ) : (
        ''
      )}
    </BoardViewContainer>
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

const BoardViewContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-start;
`;

const BoardFilters = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

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

  ${({ active }) =>
    active &&
    `
        background: rgb(210, 229, 254) !important;
        color: rgb(0, 82, 204);
    `}
`;

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

  ${({ active }) =>
    active &&
    `
        background: rgb(210, 229, 254) !important;
        color: rgb(0, 82, 204);
    `}
`;

const Swimlane = styled.div`
  background-color: rgb(244 245 247);
  border: 5px solid rgb(244 245 247);
  border-radius: 2px;
  outline: none;
  height: auto;

  ${({ isHovered }) =>
    isHovered &&
    `
        border: 5px solid #4c9aff;
        border-radius: 4px;
    `}
`;

const SwimlaneBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 20px;
  font-size: 15px;
  justify-content: flex-start;
  width: 100%;
`;

const SwimlaneHeader = styled.div`
  white-space: nowrap;
  margin-top: 10px;
  margin-left: 10px;
  font-family: CircularStdBook;
  color: #5e6c84;
  font-size: 12.5px;
`;

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
  ${'' /* max-width: 350px; */}

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
  cursor: pointer;

  ${({ active }) =>
    active &&
    `
        outline: 3px solid #4c9aff;
    `}
`;

const UserAvatars = styled.div`
  display: flex;
  padding-right: -10px;
`;

export default BoardView;
