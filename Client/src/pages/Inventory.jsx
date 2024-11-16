import React, { useState } from 'react';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import { AuthProvider } from '../components/Auth';
import TopNav from '../components/topnav/TopNav';

const Inventory = ({ sidebarOpen, toggleSidebar }) => {
    const [inventory, setInventory] = useState([
        { id: 1, model: 'iPhone 13', price: 799, quantity: 10 },
        { id: 2, model: 'Samsung Galaxy S21', price: 699, quantity: 5 },
        { id: 3, model: 'Google Pixel 6', price: 599, quantity: 8 },
        { id: 4, model: 'OnePlus 9', price: 729, quantity: 3 },
    ]);

    const [newPhone, setNewPhone] = useState({ model: '', price: '', quantity: '' });

    const handleAddStock = (id) => {
        setInventory(inventory.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleRemoveStock = (id) => {
        setInventory(inventory.map(item =>
            item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPhone({ ...newPhone, [name]: value });
    };

    const handleAddPhone = (e) => {
        e.preventDefault();
        const newId = inventory.length ? inventory[inventory.length - 1].id + 1 : 1; // Generate new ID
        const newItem = {
            id: newId,
            model: newPhone.model,
            price: parseFloat(newPhone.price),
            quantity: parseInt(newPhone.quantity),
        };
        setInventory([...inventory, newItem]);
        setNewPhone({ model: '', price: '', quantity: '' }); // Reset the form
    };

    return (
        <AuthProvider>
            <div className="home-page flex flex-col sm:flex-row w-full min-h-screen">
                <SidebarWithRoleControl />
                <TopNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="ml-0 w-full bg-[#f4f4f4] p-8 sm:ml-64">
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
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 text-left">Model</th>
                                    <th className="py-2 px-4 text-left">Price</th>
                                    <th className="py-2 px-4 text-left">Quantity</th>
                                    <th className="py-2 px-4 text-left hidden sm:flex">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map(item => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-2 px-4">{item.model}</td>
                                        <td className="py-2 px-4">${item.price}</td>
                                        <td className="py-2 px-4">{item.quantity}</td>
                                        <td className="py-2 px-4 hidden sm:flex">
                                            <button
                                                onClick={() => handleAddStock(item.id)}
                                                className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                                            >
                                                Add Stock
                                            </button>
                                            <button
                                                onClick={() => handleRemoveStock(item.id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded-md"
                                            >
                                                Remove Stock
                                            </button>
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