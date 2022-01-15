import React, {useState} from 'react';
import styled from 'styled-components';
import useComponentVisible from '../customHooks/useComponentVisible';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const MAPPING = [
    {
        'title': 'Highest',
        'code': 'sev2'
    },
    {
        'title': 'Higher',
        'code': 'sev1'
    },
    {
        'title': 'Medium',
        'code': 'high'
    },
    {
        'title': 'Lowest',
        'code': 'low'
    }];

const PriorityTile = (props) => {

    const [isExpanded,setIsExpanded] = useState(false);

    const value = MAPPING.filter(prio => prio.code === props.priority)[0].title;

    const onClick = (newVal) => {
        props.setPriority(newVal);
        setIsExpanded(false);
    }

    return(
        <div style={{'width':'75%'}}>
            <Container
                onClick={()=>setIsExpanded(!isExpanded)}
                style={{'border': '1px solid #dfe1e6'}}
            >
                <UserInfo>
                    {RenderTicketSeverityIcon(value)}
                    {value}
                </UserInfo>
            </Container>
            <div>
                {isExpanded &&          
                    <DropDown
                        value={value}
                        onClick={onClick}
                    />
                }
            </div>
        </div>
    );
}

const DropDown = (props) => {

    const { ref, isComponentVisible } = useComponentVisible(true);

    return (
        <DropDownComponent ref={ref}>
            {isComponentVisible && (MAPPING.map((prio,i) => {

                    if(prio.title !== props.value ) {
                        return(
                        <Container
                            key={i}
                            onClick={() => props.onClick(prio.code)}
                            style={{'border': '1px solid #F4F5F7'}}
                        >
                        <UserInfo>
                            {RenderTicketSeverityIcon(prio.title)}
                            {prio.title}
                        </UserInfo>
                        </Container>
                        );
                    } else {
                        return "";
                    }
            }))}
        </DropDownComponent>
    );

}

const RenderTicketSeverityIcon = (priority) => {

    var color = "";
    const fontSize = 18;
    switch(priority) {

        case "Highest":
            color = "#cd1316";
            break;
        case "Higher":
            color = "#e97f33";
            break;
        case "Medium":
            color = "#57a55a";
            break;
        case "Lowest":
            color = "#2d8738";
            break;
        default:
            color = "#2d8738";
    }

    if(priority === "Highest" || priority === "Higher") {
        return(<ArrowUpwardIcon sx={{ color:{color}, 'fontSize':{fontSize} }}/>);
    }
    else {
        return(<ArrowDownwardIcon sx={{ color:{color},'fontSize':{fontSize} }}/>);
    }
} 

export default PriorityTile;

const DropDownComponent = styled.div`
    background-color: rgb(244 245 247);
    position: absolute;
    width: 169px;
`

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    height: inherit;
`

const Container = styled.div`
    background-color: rgb(244 245 247);
    height: 32px;
    font-size: 12px;
    font-family: CircularStdBold;
    color: #172B4D;
    cursor: pointer;
    width: 169px;

    &:hover {
        background-color: rgb(235, 236, 240);
`