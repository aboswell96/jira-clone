import React from 'react';
import styled from 'styled-components';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const TextSearchBoxComponent = styled.input`
    width: 160px;
    height: 30px;
    background-color: rgb(244 245 247);
    border: 1px solid rgb(223, 225, 230);
    border-radius: 4px;
    outline: none;
    font-family: CircularStdBook;
    margin-top: ${props => props.marginTop};
    text-indent: 35px;

    &:hover {
        background-color: #ebecf0;
    }

    &:focus {
        background-color: white;
        border: 2px solid #4c9aff;
    }
`

const Icon = styled.div`
    position: absolute;
    top: 40px;
    left: 10px;
`

const ContainerRow = styled.div`
    position: relative;
`

const Row = styled.div`
    position: absolute;
`

const TextSearchBox = (props) => {
    return(
        <ContainerRow>
            <TextSearchBoxComponent marginTop='35px'/>
            <Icon>
                <SearchOutlinedIcon color="disabled"/>
            </Icon>
        </ContainerRow>
    );
}

export default TextSearchBox;