import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../components/Auth';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import TopNav from '../components/topnav/TopNav';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const UserManagement = ({ toggleSidebar, sidebarOpen }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/users", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users:", res.statusText);
      }
    } catch (error) {
      console.error("API link not working", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (newUser.username && newUser.email && newUser.password && newUser.role) {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          const createdUser = await response.json();
          setUsers([...users, createdUser]);
          setNewUser({ username: '', email: '', password: '', role: '' });
        } else {
          console.error("Failed to add user:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    } else {
      console.error("Please fill in all fields.");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (editingUser) {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/users/${editingUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingUser),
        });

        if (response.ok) {
          setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
          setEditingUser(null);
        } else {
          console.error("Failed to update user:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleDeleteUser = (id) => {
    setUserToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/${userToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userToDelete));
        setConfirmDeleteOpen(false);
        setUserToDelete(null);
      } else {
        console.error("Failed to delete user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <AuthProvider>
      <div className="home -page flex flex-col sm:flex-row w-full min-h-screen">
        <SidebarWithRoleControl />
        <TopNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="ml-0 w-full bg-[#f4f4f4] p-8 sm:ml-64">

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">{editingUser ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="flex flex-col">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={editingUser ? editingUser.username : newUser.username}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={editingUser ? editingUser.email : newUser.email}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={editingUser ? editingUser.password : newUser.password}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              />
              <select
                name="role"
                value={editingUser ? editingUser.role : newUser.role}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
              </select>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                {editingUser ? 'Update User' : 'Add User'}
              </button>
              {editingUser && (
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User  List</h2>
            <div className='overflow-scroll sm:overflow-hidden'>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left">Username</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Role</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b">
                      <td className="py-2 px-4">{user.username}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">{user.role}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-500 hover:underline mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to delete this user?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDelete} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </AuthProvider >
  );
};

export default UserManagement;