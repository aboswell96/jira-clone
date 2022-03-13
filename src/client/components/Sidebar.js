import { useState } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SearchIssuesModal from './SearchIssues';
import CreateTicket from './CreateTicket';

const Sidebar = () => {
  const [sidebarWidth, SetSideBarWidth] = useState('64px');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCreateTicketExpanded, setIsCreateTicketExpanded] = useState(false);

  const handleCloseCreateTicket = () => {
    SetSideBarWidth('64px');
    setIsExpanded(false);
    setIsCreateTicketExpanded(false);
  };

  const mouseEnter = () => {
    if (isCreateTicketExpanded) return;

    SetSideBarWidth('200px');
    setIsExpanded(true);
  };

  const mouseLeave = () => {
    if (isCreateTicketExpanded) return;

    SetSideBarWidth('64px');
    setIsExpanded(false);
  };

  const [open, setOpen] = useState(false);
  const handleOpenSearch = () => setOpen(true);
  const handleCloseSearch = () => {
    setOpen(false);
    SetSideBarWidth('64px');
    setIsExpanded(false);
  };

  return (
    <SidebarComponent
      style={{ width: sidebarWidth }}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <Link to="board" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Icon
          src="https://i.ibb.co/fGyrz6b/jira-icon.png"
          alt="Icon"
          expanded={isExpanded}
        />
      </Link>
      <NavOptions>
        <Tab expanded={isExpanded} onClick={handleOpenSearch}>
          <ProjectIcon expanded={isExpanded}>
            <SearchIcon sx={{ color: 'white', fontSize: 30 }} />
          </ProjectIcon>
          <Title>{isExpanded && 'Search Issues'}</Title>
        </Tab>
        <Tab
          expanded={isExpanded}
          onClick={() => setIsCreateTicketExpanded(true)}
        >
          <ProjectIcon expanded={isExpanded}>
            <AddIcon sx={{ color: 'white', fontSize: 30 }} />
          </ProjectIcon>
          <Title>{isExpanded && 'Create Issue'}</Title>
        </Tab>
      </NavOptions>
      <SearchIssuesModal handleClose={handleCloseSearch} open={open} />
      <CreateTicket
        open={isCreateTicketExpanded}
        handleClose={handleCloseCreateTicket}
      />
    </SidebarComponent>
  );
};

const Icon = styled.img`
  height: 32px;
  width: 32px;
  margin: auto;
  display: block;
  padding-top: 35px;

  ${({ expanded }) =>
    expanded &&
    `
        margin-left:15px;
    `}
`;

const SidebarComponent = styled.div`
  height: 100vh;
  background-color: #0747a6;
  transition: width 0.1s;
  margin: 0;
  position: absolute;
  z-index: 1;
`;

const NavOptions = styled.div`
  padding-top: 30px;
`;

const Tab = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  overflow: hidden;
  font-family: CircularStdBook;
  transition: background 0.1s ease 0s;
  cursor: pointer;

  ${({ expanded }) =>
    expanded &&
    `
        gap: 15px;
        justify-content: flex-start;
        padding-left:15px;
    `}

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.div`
  color: white;
  font-size: 14.7px;
`;

const ProjectIcon = styled.div`
  margin: auto;

  ${({ expanded }) =>
    expanded &&
    `
        margin:0;
    `}
`;

export default Sidebar;
