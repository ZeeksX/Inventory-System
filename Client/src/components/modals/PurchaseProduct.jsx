import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PurchaseProduct = ({ username, email, item, setUsername, setEmail, setItem, handleSubmit }) => {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [inventoryMessage, setInventoryMessage] = useState('');

    const checkInventory = async (selectedItem) => {
        setLoading(true);
        setInventoryMessage('');

        // Simulating an API call to check inventory
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading time

        // Mock inventory data
        const inventory = {
            "iPhone 13": 10,
            "Samsung A12": 0,
            "Samsung z-fold": 5,
            "None": 0
        };

        if (inventory[selectedItem] > 0) {
            setInventoryMessage(`Available: ${inventory[selectedItem]} in stock`);
        } else {
            setInventoryMessage('Out of stock');
        }
        setLoading(false);
    };

    const handleItemChange = (e) => {
        const selectedItem = e.target.value;
        setItem(selectedItem);
        checkInventory(selectedItem);
    };

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
                    onChange={handleItemChange}
                >
                    <MenuItem value={"iPhone 13"}>iPhone 13</MenuItem>
                    <MenuItem value={"Samsung A12"}>Samsung A12</MenuItem>
                    <MenuItem value={"Samsung z-fold"}>Samsung z-fold</MenuItem>
                    <MenuItem value={"None"}>None</MenuItem>
                </Select>
            </FormControl>
            {loading && <p>Checking inventory...</p>}
            {inventoryMessage && <p>{inventoryMessage}</p>}
            <FormControl fullWidth variant="outlined">
                <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    slotProps=
                    {{
                        input: { min: 1 }
                    }} // Minimum quantity of 1
                />
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