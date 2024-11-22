import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Toast = ({ open, message, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert onClose={onClose} severity="info" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;