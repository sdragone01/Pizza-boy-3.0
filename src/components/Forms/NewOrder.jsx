import React, { Component } from 'react';
import { useState } from 'react';
import fire from '../../config/Fire';
import { getDatabase, ref, set } from 'firebase/database';
import './NewOrder.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CashOrder from './CashOrder';
import CreditOrder from './CreditOrder';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function NewOrder() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div className="newOrder">
            <Button variant="contained" onClick={handleOpen}>
                New Cash Order
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CashOrder />
                </Box>
            </Modal>

        </div>
    );




}




