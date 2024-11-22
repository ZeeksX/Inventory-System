import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PurchaseProduct = ({
    username,
    email,
    item,
    setUsername,
    setEmail,
    setItem,
    handleSubmit,
}) => {
    const [quantity, setQuantity] = useState(1);
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inventoryMessage, setInventoryMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Fetch inventory data when the component mounts
    useEffect(() => {
        const fetchInventory = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/v1/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const inventoryData = await response.json();
                console.log(inventoryData);
                setInventory(inventoryData);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
            setLoading(false);
        };

        fetchInventory();
    }, []);

    const checkInventory = (selectedItem) => {
        const product = inventory.find(item => item.name === selectedItem);
        if (product) {
            if (product.stock > 0) {
                setInventoryMessage(`Available: ${product.stock} in stock`);
            } else {
                setInventoryMessage('Out of stock');
            }
        }
    };

    const handleItemChange = (e) => {
        const selectedItem = e.target.value;
        setItem(selectedItem);
        checkInventory(selectedItem);
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value, 10) || 1);
        setQuantity(value);
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
                    required
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
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="item-select-label">Item to purchase</InputLabel>
                <Select
                    labelId="item-select-label"
                    id="item-select"
                    value={item}
                    onChange={handleItemChange}
                    label="Item"
                >
                    {inventory.map((product) => (
                        <MenuItem key={product.id} value={product.name}>
                            {product.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {loading && <p>Loading inventory...</p>}
            {inventoryMessage && <p>{inventoryMessage}</p>}
            <FormControl fullWidth variant="outlined">
                <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    slotProps={{
                        input: {
                            min: 1,
                            max: item ? inventory.find(product => product.name === item)?.stock : undefined,
                        },
                    }}
                    helperText={
                        item ? `Max available: ${inventory.find(product => product.name === item)?.stock || 0}` : ''
                    }
                />
            </FormControl>
            <div className="flex flex-row justify-between gap-4 items-center w-full">
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
                    disabled={loading || (item && inventory.find(product => product.name === item)?.stock === 0)}
                >
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default PurchaseProduct;