import React, { useState } from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextSearchBox from './TextSearchBox';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    pt: 25/8,
    pr: 35/8,
    pb: 60/8,
    pl: 35/8,
    width: 1040,
    bgcolor: 'background.paper',
    boxShadow: 24,
    verticalAlign:'top',
    transform: 'translate(-50%, -50%)',
  };

const TicketModal = (props) => {

    const [searchInput,setSearchInput] = useState("");
    const onChange = (e) => {
        setSearchInput(e.target.value);
    }

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


export default TicketModal;