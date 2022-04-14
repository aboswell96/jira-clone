import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import useComponentVisible from '../common/customHooks/useComponentVisible';
import { ThemeContext } from '../nav/Project';

const UserTile = (props) => {
  const darkTheme = useContext(ThemeContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const value = props.user;

  const onClick = (newVal) => {
    props.setUser(newVal);
    setIsExpanded(false);
  };

  return (
    <div data-testid="user-tile">
      <Container
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        style={{ border: '1px solid #dfe1e6' }}
        darkTheme={darkTheme}
      >
        <UserInfo>
          {value.length > 1 && (
            <UserAvatar
              img={value[1].photo}
              height={'24px'}
              width={'24px'}
              data-testid="user-photo"
            />
          )}
          {value.length > 1 && value[1].firstName + ' ' + value[1].lastName}
        </UserInfo>
      </Container>
      {isExpanded && value.length > 1 && (
        <DropDown users={props.users} value={value} onClick={onClick} />
      )}
    </div>
  );
};

const DropDown = (props) => {
  const { ref, isComponentVisible } = useComponentVisible(true);
  const darkTheme = useContext(ThemeContext);
  return (
    <DropDownComponent ref={ref}>
      {isComponentVisible &&
        props.users.map((user, i) => {
          if (props.value[0] !== user[0]) {
            return (
              <Container
                key={i}
                onClick={() => {
                  props.onClick(user[0]);
                }}
                style={{ border: '1px solid #F4F5F7' }}
                darkTheme={darkTheme}
              >
                <UserInfo>
                  <UserAvatar
                    img={user[1].photo}
                    height={'24px'}
                    width={'24px'}
                  />
                  {user[1].firstName + ' ' + user[1].lastName}
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

export default UserTile;

const DropDownComponent = styled.div`
  background-color: rgb(244 245 247);
  position: absolute;
  width: 169px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-start;
  height: inherit;
  margin-left: 30px;
`;

const Container = styled.div`
    background-color: ${(props) => (props.darkTheme ? '#161b22' : '#F4F5F7')};
    height: 32px;
    font-size: 12px;
    font-family: CircularStdBold;
    color: ${(props) => (props.darkTheme ? 'white' : '#172B4D')};
    cursor: pointer;
    width: 169px;

    &:hover {
      background-color: ${(props) => (props.darkTheme ? '#21262d' : '#ebecf0')};
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
`;
