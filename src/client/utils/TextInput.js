import React from 'react';
import styled from 'styled-components';

const TextInputComponent = styled.input`
    width: 640px;
    height: 30px;
    background-color: rgb(244 245 247);
    border: 1px solid rgb(223, 225, 230);
    border-radius: 4px;
    outline: none;
    font-family: CircularStdBook;

    &:hover {
        background-color: #ebecf0;
    }

    &:focus {
        background-color: white;
        border: 2px solid #4c9aff;
    }
`

const TextInput = (props) => {

    return(
        <TextInputComponent type="text" value={props.value} onChange={props.onChange}/>
    );
}

export default TextInput;