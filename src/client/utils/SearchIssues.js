import { useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextSearchBox from './TextSearchBox';

import {useTextInput} from '../utils/helpers';

const initalLanes = [
    {
        'title':'Backlog',
        'tickets': [
            {
                'title':'Add Drag n Drop',
                'type':'bug',
                'priority':'sev2',
                'assignee': -1,
                'id': 13432,
            },
            {
                'title':'Add backend',
                'type':'story',
                'priority':'sev1',
                'assignee': -1,
                'id': 53453,
            }
        ],
    },
    {
        'title':'Selected for Development',
        'tickets': [
            {
                'title':'Add ticket search',
                'type':'story',
                'priority':'high',
                'assignee': 100,
                'id': 312321,
            },
            {
                'title':'Add ticket filters by status',
                'type':'task',
                'priority':'low',
                'assignee': 200,
                'id': 6754456,
            },
            {
                'title':'Add description and project type to settings',
                'type':'story',
                'priority':'sev2',
                'assignee': 300,
                'id': 43242,
            }
        ],
    },
    {
        'title':'In Progress',
        'tickets':[
            {
                'title':'Add BoardView',
                'type':'story',
                'priority':'low',
                'assignee': 100,
                'id': 56343,
            }
        ]
    },
    {
        'title':'Done',
        'tickets':[
            {
                'title':'add routes',
                'type':'story',
                'priority':'sev1',
                'assignee': 300,
                'id': 76866,
            }
        ]
    }
];

const style = {
    position: 'absolute',
    top:'0%',
    left:'0%',
    pt: 25/8,
    pr: 35/8,
    pb: 60/8,
    pl: 35/8,
    width: 530,
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    verticalAlign:'top',
  };

const SearchIssuesModal = (props) => {

    const [searchInput,onChange] = useTextInput("");

    return(
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextSearchBox
                        value={searchInput}
                        onChange={onChange}
                        width="500px"
                        placeholder="Search for issues by description or number..."
                    />
                    
                </Box>
            </Modal>
        </div>
    );

}

export default SearchIssuesModal;