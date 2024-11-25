import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PurchaseProduct = ({
    username,
    email,
    phoneNumber,
    itemToPurchase,
    quantity,
    setUsername,
    setEmail,
    setItem,
    setQuantity,
    setPhoneNumber,
    handleSubmit,
    totalCost,
    setTotalCost
}) => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inventoryMessage, setInventoryMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

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

        // Update the price and total cost based on selected item
        const product = inventory.find(item => item.name === selectedItem);
        if (product) {
            setTotalCost(quantity * product.price); // Update total cost
        }
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value, 10) || 1);
        setQuantity(value); // Update quantity state in parent

        // Update the total cost based on new quantity
        const product = inventory.find(item => item.name === itemToPurchase);
        if (product) {
            setTotalCost(value * product.price); // Update total cost
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if all required fields are filled
        if (!username || !email || !phoneNumber || !itemToPurchase || quantity < 1) {
            alert('Please fill out all required fields.');
            return; // Prevent submission if fields are empty
        }

        // Handle the purchase request
        const data = {
            username,
            email,
            phoneNumber,
            itemToPurchase,
            quantity,
            totalCost
        };

        try {
            const response = await fetch('http://localhost:3000/api/v1/request/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Purchase Success:', result);
            setSnackbarOpen(true); // Open the Snackbar on success

            // Reload the page after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 2000); // 2 seconds delay before reload

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
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
                        value={itemToPurchase}
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
                {loading && <p>Loading inventory ...</p>}
                {inventoryMessage && <p>{inventoryMessage}</p>}
                <FormControl fullWidth variant="outlined">
                    <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        inputProps={{
                            min: 1,
                            max: itemToPurchase ? inventory.find(product => product.name === itemToPurchase)?.stock : undefined,
                        }}
                        helperText={
                            itemToPurchase ? `Max available: ${inventory.find(product => product.name === itemToPurchase)?.stock || 0}` : ''
                        }
                    />
                </FormControl>
                <p>Total Cost: ${totalCost.toFixed(2)}</p>
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
                        disabled={loading || (itemToPurchase && inventory.find(product => product.name === itemToPurchase)?.stock === 0)}
                    >
                        Submit
                    </Button>
                </div>
            </form>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Order has been placed successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default PurchaseProduct;