import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/inventory-logo.svg";
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, FormControl, OutlinedInput, IconButton, Button } from "@mui/material";
import "../styles/main.css";
import ForgotPassword from '../components/modals/ForgotPassword'; // Import the ForgotPassword component
import RegistrationModal from '../components/modals/RegistrationModal'; // Import the RegistrationModal component

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false); // State for registration modal
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

    const navigate = useNavigate();

    const navItems = ["Home", "About", "Contact"];

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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

            if (res.ok) {
                const data = await res.json();
                console.log(data);
                navigate("/dashboard"); 
            } else {
                console.error("Login failed:", res.statusText);
            }
        } catch (error) {
            console.error("API link not working", error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleForgotPasswordOpen = () => {
        setForgotPasswordOpen(true);
    };

    const handleForgotPasswordClose = () => {
        setForgotPasswordOpen(false);
    };

    const handleRegistrationClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="flex flex-col items-center gap-12 p-4 w-full min-h-screen bg-[#f4f4f4]">
                <nav className="flex flex-row items-center w-full h-8 justify-between p-8 mb-4">
                    <div className="flex flex-row w-1/4 items-center">
                        <img src={Logo} alt="header-logo" className="w-1/3" />
                        <h3 className="text-[black] text-3xl font-semibold">Inventory HUB</h3>
                    </div>

                    <div className="flex flex-row gap-8 justify-between">
                        <ul className="flex flex-row gap-8">
                            {navItems.map((item) => (
                                <li key={item} className="text-[black] hover:text-[darkgrey] text-xl cursor-pointer">{item}</li>
                            ))}
                        </ul>
                        <button onClick={handleClickOpen} className="rounded bg-blue-700 text-xl hover:bg-[green] text-white py-1 px-3 border border-transparent transition-all focus:outline-none focus:ring-2">
                            Register
                        </button>
                    </div>
                </nav>
                <div className="flex flex-col w-1/3 rounded-xl bg-[white] text-black px-3 border gap-4 py-8">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h3 className="text-black font-bold text-2xl">Welcome Back</h3>
                        <p className="text-black text-xl italic">Sign in to access your inventory</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start justify-center w-3/5 mx-auto">
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                placeholder="Password"
                                onChange={(event) => setPassword(event.target.value)}
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
                        <div className="flex flex-row justify-between items-center w-full">
                            <button
                                className="w-24 h-9 font-semibold rounded bg-blue-600 hover:bg-[green] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                                type="submit"
                            >
                                Log in
                            </button>
                            <h3 onClick={handleForgotPasswordOpen} className="text-blue-900 hover:text-gray-600 cursor-pointer">Forgot Password?</h3>
                        </div>
                    </form>
                    <ForgotPassword open={forgotPasswordOpen} onClose={handleForgotPasswordClose} />
                    <RegistrationModal open={open} onClose={handleRegistrationClose} />
                </div>
            </div>
        </>
    );
};

export default Login;