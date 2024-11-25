/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RegistrationModal = ({ open, onClose }) => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPhoneNum, setRegisterPhoneNum] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/v1/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: registerUsername, email: registerEmail, password: registerPassword, phoneNum: registerPhoneNum, role: "customer" }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data);
                onClose(); // Close the modal on successful registration
            } else {
                console.error("Registration failed:", res.statusText);
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
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
                <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
                    <TextField
                        fullWidth
                        type="email"
                        variant="outlined"
                        placeholder="Email"
                        onChange={(event) => setRegisterEmail(event.target.value)}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Username"
                        onChange={(event) => setRegisterUsername(event.target.value)}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Phone Number"
                        onChange={(event) => setRegisterPhoneNum(event.target.value)}
                    />
                    <FormControl variant="outlined" fullWidth>
                        <OutlinedInput
                            id="outlined-adornment-register-password"
                            placeholder="Password"
                            onChange={(event) => setRegisterPassword(event.target.value)}
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
                <Button onClick={handleRegisterSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RegistrationModal;