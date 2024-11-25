/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, FormControl, OutlinedInput, IconButton } from "@mui/material";
import ForgotPassword from './modals/ForgotPassword';
import RegistrationModal from './modals/RegistrationModal';

const LoginUser = ({ onSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [registrationOpen, setRegistrationOpen] = useState(false); // State for registration modal

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleForgotPasswordOpen = () => {
        setForgotPasswordOpen(true);
    };

    const handleForgotPasswordClose = () => {
        setForgotPasswordOpen(false);
    };

    const handleRegistrationOpen = () => {
        setRegistrationOpen(true);
    };

    const handleRegistrationClose = () => {
        setRegistrationOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/api/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log("API Response:", data);

            if (res.ok) {
                // Call the onSuccess function passed from the parent component
                onSuccess();
            } else {
                console.error("Login failed:", data.message || res.statusText);
                // Handle error message here (e.g., show a toast)
            }
        } catch (error) {
            console.error("Error during login:", error.message);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center lg:justify-center justify-center gap-2 lg:gap-0 p-4 w-full bg-[#f4f4f4]">
                <div className="login flex flex-col max-w-96 lg:max-w-screen-md w-full lg:w-1/3 rounded-xl bg-[white] text-black px-4 lg:px-3 border gap-4 py-8">
                    <div className="flex flex-col justify-start items-center gap-2">
                        <h3 className="text-black font-bold text-2xl">Welcome</h3>
                        <p className="text-black text-xl text-center italic">Sign in to use our service</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start justify-center lg:max-w-96 lg:w-3/5 w-4/5 mx-auto">
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }

                            }}
                        />
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                type={showPassword ? "text" : "password"}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="start"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div className="flex flex-row justify-between gap-4 lg:gap-0 items-center w-full">
                            <button
                                className="w-24 h-9 font-semibold rounded bg-blue-600 hover:bg-[green] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2" type="submit"
                            >
                                Log in
                            </button>
                            <h3 onClick={handleForgotPasswordOpen} className="text-blue-900 hover:text-gray-600 text-center cursor-pointer">Forgot Password?</h3>
                        </div>
                    </form>
                    <p className='flex flex-row items-center justify-center gap-2'>Not Registered? <span onClick={handleRegistrationOpen} className="text-blue-600 cursor-pointer">Register</span></p>
                    <ForgotPassword open={forgotPasswordOpen} onClose={handleForgotPasswordClose} />
                    <RegistrationModal open={registrationOpen} onClose={handleRegistrationClose} />
                </div>
            </div>
        </>
    );
}

export default LoginUser;