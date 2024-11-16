import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ForgotPassword = ({ open, onClose }) => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/v1/users/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, newPassword }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data);
                onClose(); // Close the modal on successful password reset
            } else {
                console.error("Password reset failed:", res.statusText);
            }
        } catch (error) {
            console.error("API link not working", error);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogContent>
                <form onSubmit={handleForgotPasswordSubmit} className="flex flex-col gap-4">
                    <TextField
                        fullWidth
                        type="email"
                        variant="outlined"
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <FormControl variant="outlined" fullWidth>
                        <OutlinedInput
                            id="outlined-adornment-new-password"
                            placeholder="New Password"
                            onChange={(event) => setNewPassword(event.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="start">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleForgotPasswordSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ForgotPassword;