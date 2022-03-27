import React from 'react';
import styled from 'styled-components';

const Container = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: white;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  outline: none;
  font-family: CircularStdBook;
  font-size: ${(props) => props.fontSize};
  padding-top: 1px;
  margin-top: ${(props) => props.mt};
  color: #172b4d;
  cursor: pointer;

  &:hover {
    border: 1px solid #c1c7d0;
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

const AddComment = (props) => {
  return (
    <Container
      type="text"
      value={props.value}
      onChange={props.onChange}
      width={props.width}
      height={props.height}
      placeholder={props.placeholder}
      fontSize={props.fontSize}
      mt={props.mt}
      data-testid="add-comment"
    />
  );
};

export default AddComment;
