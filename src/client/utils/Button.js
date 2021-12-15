import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
    background-color: #0052cc;
    width: 115px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #0052cc;
    color: white;
    font-family: CircularStdBook;
    font-size: 14.5px;
    margin-top: ${props => props.marginTop};

    &:hover {
        background-color: #005eeb;
        cursor: pointer;
    }

    &:active {
        background-color: #004ab8;
    }
`

const Button = (props) => {
    return(
        <ButtonWrapper 
            marginTop={props.marginTop}
            onClick={props.onClick}
        >
        {props.text}
        </ButtonWrapper>
    )
}

export default Button;