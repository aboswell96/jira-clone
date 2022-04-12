import React from 'react';
import styled from 'styled-components';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const TextSearchBoxComponent = styled.input`
  width: ${(props) => props.width};
  height: 28px;
  color: ${(props) => (props.darkTheme ? 'white' : 'black')};
  background-color: ${(props) => (props.darkTheme ? '#161b22' : '#f4f5f7')};
  border: 1px solid rgb(223, 225, 230);
  border-radius: 4px;
  outline: none;
  font-family: CircularStdBook;
  margin-top: ${(props) => props.marginTop};
  text-indent: 35px;

  &:hover {
    background-color: ${(props) => (props.darkTheme ? '#21262d' : '#ebecf0')};
  }

  &:focus {
    background-color: ${(props) => (props.darkTheme ? '#21262d' : 'white')};
    outline: 2px solid #4c9aff;
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
`;

const ContainerRow = styled.div`
  position: relative;
`;

const TextSearchBox = (props) => {
  return (
    <ContainerRow>
      <TextSearchBoxComponent
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        width={props.width}
        data-testid="search-input"
        darkTheme={props.darkTheme}
      />
      <Icon>
        <SearchOutlinedIcon color={props.darkTheme ? 'primary' : 'disabled'} />
      </Icon>
    </ContainerRow>
  );
};

export default TextSearchBox;
