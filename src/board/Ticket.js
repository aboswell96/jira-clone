import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BugReportIcon from '@mui/icons-material/BugReport';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../nav/Project';

const PriorityKeyToUserString = [
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

const IssueKeyToUserString = [
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

const Ticket = (props) => {
  const darkTheme = useContext(ThemeContext);

  return (
    <TicketCard
      onClick={() => props.handleOpen(props.ticket)}
      darkTheme={darkTheme}
    >
      {props.ticket[1].title}
      <TicketIcons>
        <Tooltip
          title={
            IssueKeyToUserString.filter(
              (type) => type.code === props.ticket[1].type
            )[0].title
          }
          placement="top"
        >
          {RenderTicketTypeIcon(props.ticket[1].type)}
        </Tooltip>
        <Tooltip
          title={
            PriorityKeyToUserString.filter(
              (p) => p.code === props.ticket[1].priority
            )[0].title
          }
          placement="top"
        >
          {RenderTicketSeverityIcon(props.ticket[1].priority)}
        </Tooltip>
        {props.assignee[0] && (
          <Tooltip
            title={[
              props.assignee[0][1].firstName,
              props.assignee[0][1].lastName,
            ].join(' ')}
            placement="top"
          >
            <UserAvatar
              img={props.assignee[0][1].photo}
              height={'24px'}
              width={'24px'}
            />
          </Tooltip>
        )}
      </TicketIcons>
    </TicketCard>
  );
};

export default Ticket;

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

const TicketCard = styled.div`
  font-family: CircularStdBook;
  background-color: ${(props) => (props.darkTheme ? '#161b22' : 'white')};
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 2px 0px;
  transition: background 0.1s ease 0s;
  border-radius: 3px;
  cursor: pointer;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  color: ${(props) => (props.darkTheme ? 'white' : '#172b4d')};
  &:hover {
    background-color: ${(props) => (props.darkTheme ? '#21262d' : '#ebecf0')};
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
