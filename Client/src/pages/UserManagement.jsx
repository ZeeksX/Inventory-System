import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../components/Auth';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import TopNav from '../components/topnav/TopNav';

const UserManagement = ({ toggleSidebar, sidebarOpen }) => {
  // Sample user data
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [editingUser, setEditingUser] = useState(null);

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/users", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data); // Set the fetched users
      } else {
        console.error("Failed to fetch users:", res.statusText);
      }
    } catch (error) {
      console.error("API link not working", error);
    }
  };

  useEffect(() => {
    getUsers(); // Call getUsers when the component mounts
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.role) {
      const newUserWithId = {
        id: users.length ? Math.max(users.map(user => user.id)) + 1 : 1, // Generate new ID
        ...newUser,
      };
      setUsers([...users, newUserWithId]); // Add new user
      setNewUser({ name: '', email: '', role: '' }); // Reset form
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
      setEditingUser(null); // Reset editing state
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <AuthProvider>
      <div className="home-page flex flex-col sm:flex-row w-full min-h-screen">
        <SidebarWithRoleControl />
        <TopNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="ml-0 w-full bg-[#f4f4f4] p-8 sm:ml-64">

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">{editingUser ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="flex flex-col">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editingUser ? editingUser.name : newUser.name}
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
              <select
                name="role"
                value={editingUser ? editingUser.role : newUser.role}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User ">User </option>
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
              <table className=" min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left">Name</th>
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
        </div>
      </div>
    </AuthProvider>
  );
};

export default UserManagement;