import React, { useState, useEffect } from 'react';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import { AuthProvider } from '../components/Auth';
import TopNav from '../components/topnav/TopNav';

const Inventory = ({ sidebarOpen, toggleSidebar }) => {
    const [inventory, setInventory] = useState([]);
    const [newPhone, setNewPhone] = useState({ model: '', price: '', quantity: '' });

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/products'); // Adjust the API URL if needed
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json(); // Assuming the API returns an array of products
                setInventory(data);
            } catch (error) {
                console.error("Error fetching inventory:", error);
            }
        };

        fetchInventory();
    }, []);

    const handleAddStock = async (id) => {
        const updatedInventory = inventory.map(item =>
            item.id === id ? { ...item, stock: item.stock + 1 } : item
        );

        setInventory(updatedInventory); // Update local state

        // Update stock in the database
        try {
            const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
                method: 'PATCH', // Use PATCH to update a resource
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stock: updatedInventory.find(item => item.id === id).stock }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("Error updating stock:", error);
            // Optionally revert the local state if the update fails
            setInventory(inventory);
        }
    };

    const handleRemoveStock = async (id) => {
        const itemToUpdate = inventory.find(item => item.id === id);
        if (itemToUpdate && itemToUpdate.stock > 0) {
            const updatedInventory = inventory.map(item =>
                item.id === id ? { ...item, stock: item.stock - 1 } : item
            );

            setInventory(updatedInventory); // Update local state

            // Update stock in the database
            try {
                const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
                    method: 'PATCH', // Use PATCH to update a resource
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ stock: updatedInventory.find(item => item.id === id).stock }),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
            } catch (error) {
                console.error("Error updating stock:", error);
                // Optionally revert the local state if the update fails
                setInventory(inventory);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPhone({ ...newPhone, [name]: value });
    };

    const handleAddPhone = async (e) => {
        e.preventDefault();
        const newItem = {
            name: newPhone.model,
            price: parseFloat(newPhone.price),
            stock: parseInt(newPhone.quantity),
        };

        try {
            const response = await fetch('http://localhost:3000/api/v1/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const addedProduct = await response.json(); // Assuming the API returns the created product
            setInventory([...inventory, addedProduct]);
            setNewPhone({ model: '', price: '', quantity: '' }); // Reset the form
        } catch (error) {
            console.error("Error adding new product:", error);
        }
    };

    return (
        <AuthProvider>
            <div className="home-page flex flex-col sm:flex-row w-full min-h-screen">
                <SidebarWithRoleControl />
                <TopNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="sm:ml-64 w-full bg-[#f4f4f4] p-8 ml-0">
                    <h1 className="text-3xl font-bold mb-6">Inventory</h1>

                    {/* Add New Phone Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">Add New Phone</h2>
                        <form onSubmit={handleAddPhone}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Model</label>
                                <input
                                    type="text"
                                    name="model"
                                    value={newPhone.model}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded-md w-full p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={newPhone.price}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded-md w-full p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={newPhone.quantity}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded-md w-full p-2"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Add Phone
                            </button>
                        </form>
                    </div>

                    {/* Inventory Table */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-1 sm:px-4 text-left">Model</th>
                                    <th className="py-2 px-1 sm:px-4 text-left">Price</th>
                                    <th className="py-2 px-1 sm:px-4 text-left">
                                        <span className="hidden sm:inline">Quantity</span>
                                        <span className="inline sm:hidden">Qty</span>
                                    </th>
                                    <th className="py-2 px-1 sm:px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map(item => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-2 px-1 sm:px-4">{item.name}</td>
                                        <td className="py-2 px-1 sm:px-4">${item.price}</td>
                                        <td className="py-2 px-1 sm:px-4">{item.stock}</td>
                                        <td className="py-2 px-1 sm:px-4">
                                            <div className='flex sm:flex-row flex-col gap-2 '>
                                                <button
                                                    onClick={() => handleAddStock(item.id)}
                                                    className="bg-green-500 text-white px-2 py-1 rounded-md mr-1 sm:mr-2"
                                                >
                                                    <span className="hidden sm:inline">Add Stock</span>
                                                    <span className="inline sm:hidden">Add</span>
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveStock(item.id)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded-md mr-1 sm:mr-2"
                                                >
                                                    <span className="hidden sm:inline">Remove Stock</span>
                                                    <span className="inline sm:hidden">Remove</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
};

export default Inventory;