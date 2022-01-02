import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
    background-color: ${props => props.bgColor};
    width: 115px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid ${props => props.bgColor};
    color: ${props => props.color};
    font-family: CircularStdBook;
    font-size: 14.5px;
    margin-top: ${props => props.marginTop};

    &:hover {
        background-color: ${props => props.hoverColor};
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
            bgColor={props.bgColor}
            color={props.color}
            hoverColor={props.hoverColor}
        >
        {props.text}
        </ButtonWrapper>
    )
}

export default Button;