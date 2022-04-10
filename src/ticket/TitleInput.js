import React from 'react';
import styled from 'styled-components';

const TextInputComponent = styled.textarea`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  background-color: white;
  border: 1px solid white;
  border-radius: 4px;
  outline: none;
  font-family: CircularStdBook;
  font-size: ${(props) => props.fontSize};
  padding-top: 1px;
  margin-top: ${(props) => props.mt};
  color: #172b4d;
  resize: none;

  &:hover {
    background-color: #ebecf0;
  }

  &:focus {
    background-color: white;
    border: 2px solid #4c9aff;
    padding-top: 0;
    padding-left: 1px;
    padding-right: 1px;
    padding-bottom: 0;
  }
`;

const TitleInput = (props) => {
  return (
    <TextInputComponent
      type="text"
      value={props.value}
      onChange={props.onChange}
      width={props.width}
      height={props.height}
      minHeight={props.minHeight}
      placeholder={props.placeholder}
      fontSize={props.fontSize}
      mt={props.mt}
      data-testid="title-input"
    />
  );
};

export default TitleInput;
