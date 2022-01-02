import React, { useState } from 'react';
import styled from 'styled-components';
import useComponentVisible from '../customHooks/useComponentVisible';

const MAPPING = [
    {
        'title': 'Backlog',
        'code': 'backlog'
    },
    {
        'title': 'In Development',
        'code': 'inDevelopment'
    },
    {
        'title': 'In Progress',
        'code': 'inProgress'
    },
    {
        'title': 'Done',
        'code': 'done'
    }];

const StatusTile = (props) => {

    const [isExpanded,setIsExpanded] = useState(false);
    const [value,setValue] = useState(MAPPING.filter(item => item.code === props.status)[0].title);

    const onClick = (newVal) => {
        setValue(newVal)
        setIsExpanded(false)
    }

    return(
        <div>
            <Container
                onClick={()=>setIsExpanded(!isExpanded)}
                style={{'border': '1px solid #dfe1e6'}}
            >
                {value.toUpperCase()}
            </Container>
            {isExpanded && value.length > 1 && 
            <DropDown
                value={value}
                onClick={onClick}
            />
        }
        </div>
    );
}

export default StatusTile;

const DropDown = (props) => {

    const { ref, isComponentVisible } = useComponentVisible(true);

    return (
        <DropDownComponent ref={ref}>
        {isComponentVisible && MAPPING.map((status,i) => {

            if(status.title !== props.value) {
                return(
                    <Container
                        onClick={()=>props.onClick(status.title)}
                    >
                        {status.title}
                    </Container>
                );
            };
            })}
        </DropDownComponent>
    );

}

const DropDownComponent = styled.div`
    background-color: rgb(244 245 247);
    position: absolute;
    width: 169px;
`

const Container = styled.div`
    background-color: rgb(244 245 247);
    height: 32px;
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    font-size: 12px;
    font-family: CircularStdBold;
    color: #172B4D;
    width: auto;
    cursor: pointer;

    &:hover {
        background-color: rgb(235, 236, 240);
`