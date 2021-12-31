import React, {useState} from 'react';
import styled from 'styled-components';

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
    const [value,setValue] = useState(MAPPING.filter(prio => prio.code === props.priority)[0].title);

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
            {RenderTicketSeverityIcon(value)}
            {value}
        </Container>
        <div>
            {isExpanded && MAPPING.map((prio,i) => {

                if(prio.title !== value) {
                    return(
                    <Container
                        onClick={()=>onClick(prio.title)}
                    >
                        {RenderTicketSeverityIcon(prio.title)}
                        {prio.title}
                    </Container>
                    );
                }

            })}
        </div>
        </div>
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