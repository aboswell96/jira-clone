import React from 'react';
import styled from 'styled-components';

const TextInputComponent = styled.input`
  width: ${(props) => props.width};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  background-color: ${(props) => (props.darkTheme ? '#161b22' : '#f4f5f7')};
  color: ${(props) => (props.darkTheme ? 'white' : 'black')};
  border: 1px solid rgb(223, 225, 230);
  border-radius: 4px;
  outline: none;
  font-family: CircularStdBook;
  font-size: ${(props) => props.fontSize};
  padding-top: 1px;
  margin-top: ${(props) => props.mt};

  &:hover {
    background-color: ${(props) => (props.darkTheme ? '#21262d' : '#ebecf0')};
  }

  &:focus {
    background-color: ${(props) => (props.darkTheme ? '#21262d' : 'white')};
    border: 2px solid #4c9aff;
    padding-top: 0;
    padding-left: 1px;
    padding-right: 1px;
    padding-bottom: 0;
  }
`;

const TextInput = (props) => {
  return (
    <TextInputComponent
      type="text"
      value={props.value}
      onChange={props.onChange}
      width={props.width}
      minWidth={props.minWidth}
      height={props.height}
      placeholder={props.placeholder}
      fontSize={props.fontSize}
      mt={props.mt}
      data-testid="text-input"
      darkTheme={props.darkTheme}
    />
  );
};

export default TextInput;
