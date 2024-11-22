import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth";
import Brand from "../components/brand/Brand";
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, FormControl, OutlinedInput, IconButton } from "@mui/material";
import "../styles/main.css";
import ForgotPassword from '../components/modals/ForgotPassword';
import Toast from '../components/modals/Toast'; // Import the Toast component

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [toastOpen, setToastOpen] = useState(false); // State for toast visibility
    const [toastMessage, setToastMessage] = useState(""); // State for toast message

    const auth = useAuth();
    const { setUser } = auth;
    const navigate = useNavigate();
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

            const data = await res.json();
            console.log("API Response:", data);
            console.log("User email: ", data.user)

            if (res.ok) {
                // Set the user in the Auth context
                setUser({ id: data.user.id, email: data.user.email, role: data.user.role });

                setToastMessage(data.message); // Set the toast message
                setToastOpen(true); // Show the toast
                navigate("/dashboard");
            } else {
                console.error("Login failed:", data.message || res.statusText);
                setToastMessage(data.message || "Login failed. Please try again.");
                setToastOpen(true); // Show the toast
            }
        } catch (error) {
            console.error("Error during login:", error.message);
        }
    };

    const handleToastClose = () => {
        setToastOpen(false);
    };

    const handleForgotPasswordOpen = () => {
        setForgotPasswordOpen(true);
    };

    const handleForgotPasswordClose = () => {
        setForgotPasswordOpen(false);
    };



    return (
        <>
            <div className=" flex flex-col items-center lg:justify-center justify-center gap-2 lg:gap-0 p-4 w-full min-h-screen bg-[#f4f4f4]">
                <nav className="flex flex-col w-full items-center justify-center p-2 lg:p-8 mb-0 lg:mb-4">
                    {/* Brand for large screens */}
                    <div className="hidden lg:flex flex-row items-center w-full h-8 justify-center">
                        <Brand />
                    </div>

                    {/* Brand for small screens */}
                    <div className="lg:hidden flex justify-center items-center p-2">
                        <Brand />
                    </div>
                </nav>

                <div className="login flex flex-col max-w-96 lg:max-w-screen-md w-full lg:w-1/3 rounded-xl bg-[white] text-black px-4 lg:px-3 border gap-4 py-8">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h3 className="text-black font-bold text-2xl">Welcome Back</h3>
                        <p className="text-black text-xl text-center italic">Sign in to access your inventory</p>
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
                                },
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
                                className="w-24 h-9 font-semibold rounded bg-blue-600 hover:bg-[green] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                                type="submit"
                            >
                                Log in
                            </button>
                            <h3 onClick={handleForgotPasswordOpen} className="text-blue-900 hover:text-gray-600 text-center cursor-pointer">Forgot Password?</h3>
                        </div>
                    </form>
                    <ForgotPassword open={forgotPasswordOpen} onClose={handleForgotPasswordClose} />

                </div>
            </div>
            <Toast open={toastOpen} message={toastMessage} onClose={handleToastClose} /> {/* Add the Toast component here */}
        </>
    );
};

export default Login;