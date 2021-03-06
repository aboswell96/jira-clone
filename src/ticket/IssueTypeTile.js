import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import useComponentVisible from '../common/customHooks/useComponentVisible';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BugReportIcon from '@mui/icons-material/BugReport';
import { ThemeContext } from '../nav/Project';

const MAPPING = [
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

const IssueTypeTile = (props) => {
  const darkTheme = useContext(ThemeContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const value = MAPPING.filter((type) => type.code === props.issueType)[0]
    .title;

  const onClick = (newVal) => {
    props.setIssueType(newVal);
    setIsExpanded(false);
  };

  return (
    <div style={{ width: '75%' }}>
      <Container
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ border: '1px solid #dfe1e6' }}
        darkTheme={darkTheme}
      >
        <UserInfo>
          {RenderTicketTypeIcon(
            MAPPING.filter((type) => type.title === value)[0].code
          )}
          {value}
        </UserInfo>
      </Container>
      <div>{isExpanded && <DropDown value={value} onClick={onClick} />}</div>
    </div>
  );
};

const DropDown = (props) => {
  const { ref, isComponentVisible } = useComponentVisible(true);
  const darkTheme = useContext(ThemeContext);
  return (
    <DropDownComponent ref={ref}>
      {isComponentVisible &&
        MAPPING.map((type, i) => {
          if (type.title !== props.value) {
            return (
              <Container
                key={i}
                onClick={() => props.onClick(type.code)}
                style={{ border: '1px solid #F4F5F7' }}
                darkTheme={darkTheme}
              >
                <UserInfo>
                  {RenderTicketTypeIcon(type.code)}
                  {type.title}
                </UserInfo>
              </Container>
            );
          } else {
            return '';
          }
        })}
    </DropDownComponent>
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

export default IssueTypeTile;

const DropDownComponent = styled.div`
  background-color: '#F4F5F7';
  position: absolute;
  width: 169px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  height: inherit;
`;

const Container = styled.div`
    background-color: ${(props) => (props.darkTheme ? '#161b22' : '#F4F5F7')};
    height: 32px;
    font-size: 12px;
    font-family: CircularStdBold;
    color: #172B4D;
    color: ${(props) => (props.darkTheme ? 'white' : '#172B4D')};
    cursor: pointer;
    width: 169px;

    &:hover {
      background-color: ${(props) => (props.darkTheme ? '#21262d' : '#ebecf0')};
`;
