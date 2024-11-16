import React from 'react';
import { AuthProvider } from '../components/Auth';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import TopNav from '../components/topnav/TopNav';

const Settings = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <AuthProvider>
      <div className="home-page flex flex-col sm:flex-row w-full min-h-screen">
        <SidebarWithRoleControl />
        <TopNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="ml-0 w-full bg-[#f4f4f4] p-8 sm:ml-64">

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Change Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="New password"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Confirm new password"
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Update Password</button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4">Notification Preferences</h2>
            <form>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Email Notifications</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">SMS Notifications</span>
                </label>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Save Preferences</button>
            </form>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Settings;