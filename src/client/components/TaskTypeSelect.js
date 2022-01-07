import React, {useState} from 'react';
import styled from 'styled-components';
import useComponentVisible from '../customHooks/useComponentVisible';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BugReportIcon from '@mui/icons-material/BugReport';

const MAPPING = [
    {
        'title': 'Story',
        'code': 'story'
    },
    {
        'title': 'Task',
        'code': 'task'
    },
    {
        'title': 'Bug',
        'code': 'bug'
    },];

const TaskTypeSelect = (props) => {

    const [isExpanded,setIsExpanded] = useState(false);
    const [value,setValue] = useState(MAPPING.filter(type => type.code === props.type)[0].title);

    const onClick = (newVal) => {
        setValue(newVal);
        setIsExpanded(false);
        // props.onWrite('priority', MAPPING.filter(prio => prio.title === newVal)[0].code);
    }

    return(
        <div style={{'width':'75%'}}>
            <Container
                onClick={()=>setIsExpanded(!isExpanded)}
                style={{'border': '1px solid #dfe1e6'}}
            >
                <UserInfo>
                    {RenderTicketTypeIcon(MAPPING.filter(type => type.title === value)[0].code)}
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
            {isComponentVisible && (MAPPING.map((type,i) => {

                    if(type.title !== props.value ) {
                        return(
                        <Container
                            onClick={() => props.onClick(type.title)}
                            style={{'border': '1px solid #F4F5F7'}}
                        >
                        <UserInfo>
                            {RenderTicketTypeIcon(type.code)}
                            {type.title}
                        </UserInfo>
                        </Container>
                        );
                    }
            }))}
        </DropDownComponent>
    );

}

const RenderTicketTypeIcon = (type) => {

    const fontSize = 18;

    switch(type) {

        case "story":
            return(<BookmarkIcon sx={{ color: "#65ba43", 'fontSize':{fontSize}}}/>);
        case "task":
            return(<CheckBoxIcon color="primary" sx={{'fontSize':{fontSize}}}/>);
        case "bug":
            return(<BugReportIcon color="action" sx={{'fontSize':{fontSize}}}/>);
        default:
            return(<BookmarkIcon sx={{ color: "#65ba43", 'fontSize':{fontSize}}}/>);
    }
}

export default TaskTypeSelect;

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