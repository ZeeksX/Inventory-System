import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PurchaseProduct = ({ username, email, item, setUsername, setEmail, setItem, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormControl fullWidth variant="outlined">
                <TextField
                    label="Username"
                    variant="outlined"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    type="tel"
                    required
                    onChange={(e) => setItem(e.target.value)}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">Item to purchase</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item}
                    label="Item"
                    onChange={(e) => setItem(e.target.value)}
                    
                >
                    <MenuItem value={"iPhone 13"}>iPhone 13</MenuItem>
                    <MenuItem value={"Samsung A12"}>Samsung A12</MenuItem>
                    <MenuItem value={"Samsung z-fold"}>Samsung z-fold</MenuItem>
                    <MenuItem value={"None"}>None</MenuItem>
                </Select>
            </FormControl>
            <div className="flex flex-row justify-between gap-4 lg:gap-0 items-center w-full">
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="w-24"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'green',
                        },
                    }}
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}

export default PurchaseProduct;