import React, { useState, useEffect } from 'react';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import { AuthProvider } from '../components/Auth';
import TopNav from '../components/topnav/TopNav';
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../components/Supplier';
import { Button, Snackbar, Alert } from '@mui/material';

const Supplier = ({ sidebarOpen, toggleSidebar }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [form, setForm] = useState({
        name: '',
        contactName: '',
        contactEmail: '',
        deliverySchedule: '',
        phoneNumber: '',
        address: '',
    });
    const [editing, setEditing] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchSuppliers = async () => {
            const data = await getSuppliers();
            setSuppliers(data);
        };
        fetchSuppliers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await updateSupplier(editing, form);
                setSnackbarMessage('Supplier updated successfully!');
            } else {
                await createSupplier(form);
                setSnackbarMessage('Supplier created successfully!');
            }
            setSnackbarSeverity('success');
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage('Failed to save supplier. Please try again.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
            resetForm();
            const data = await getSuppliers();
            setSuppliers(data);
        }
    };

    const resetForm = () => {
        setForm({
            name: '',
            contactName: '',
            contactEmail: '',
            deliverySchedule: '',
            phoneNumber: '',
            address: '',
        });
        setEditing(null);
    };

    const handleEdit = (supplier) => {
        setForm(supplier);
        setEditing(supplier.id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteSupplier(id);
            setSnackbarMessage('Supplier deleted successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage('Failed to delete supplier. Please try again.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
            const data = await getSuppliers();
            setSuppliers(data);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <AuthProvider>
            <div className="home-page flex flex-col sm:flex-row w-full min-h-screen">
                <SidebarWithRoleControl />
                <TopNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="sm:ml-64 w-full bg-[#f4f4f4] p-8 ml-0">
                    <h1 className="text-3xl font-bold mb-6">Supplier Management</h1>

                    {/* Add New Supplier Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">Add New Supplier</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                    className="border rounded-md w-full p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Contact Name</label>
                                <input
                                    type="text"
                                    name="contactName"
                                    value={form.contactName}
                                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                                    required
                                    className="border rounded-md w-full p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Contact Email</label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={form.contactEmail}
                                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                                    required
                                    className="border rounded-md w-full p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Delivery Schedule</label>
                                <input
                                    type="text"
                                    name="deliverySchedule"
                                    placeholder='Date expected'
                                    value={form.deliverySchedule}
                                    onChange={(e) => setForm({ ...form, deliverySchedule: e.target.value })}
                                    required
                                    className="border rounded-md w-full p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                                    className="border rounded-md w-full p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    className="border rounded-md w-full p-2"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                {editing ? 'Update' : 'Create'}
                            </button>
                        </form>
                    </div>

                    {/* Suppliers List */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                        <ul className="mt-4">
                            {suppliers.map((supplier) => (
                                <li key={supplier.id} className="flex justify-between items-center p-2 border-b">
                                    <div>
                                        <strong>{supplier.name}</strong> - {supplier.contactName} ({supplier.contactEmail})
                                    </div>
                                    <div>
                                        <Button onClick={() => handleEdit(supplier)} variant="outlined" color="primary" className="mr-2">Edit</Button>
                                        <Button onClick={() => handleDelete(supplier.id)} variant="outlined" color="secondary">Delete</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </AuthProvider>
    );
};

export default Supplier;