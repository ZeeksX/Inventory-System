import React, { useState } from 'react';
import { AuthProvider } from '../components/Auth';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import TopNav from '../components/topnav/TopNav';

const Service = ({toggleSidebar, sidebarOpen}) => {
  // Sample service requests data
  const [serviceRequests, setServiceRequests] = useState([
    { id: 1, customerName: 'John Doe', phoneModel: 'iPhone 13', issue: 'Screen Replacement', date: '2023-10-01' },
    { id: 2, customerName: 'Jane Smith', phoneModel: 'Samsung Galaxy S21', issue: 'Battery Replacement', date: '2023-10-02' },
    { id: 3, customerName: 'Alice Johnson', phoneModel: 'Google Pixel 6', issue: 'Software Issue', date: '2023-10-03' },
  ]);

  const [newRequest, setNewRequest] = useState({
    customerName: '',
    phoneModel: '',
    issue: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newRequest.customerName && newRequest.phoneModel && newRequest.issue) {
      setServiceRequests([...serviceRequests, { id: serviceRequests.length + 1, ...newRequest, date: new Date().toISOString().split('T')[0] }]);
      setNewRequest({ customerName: '', phoneModel: '', issue: '' }); // Reset form
    }
  };

  return (
    <AuthProvider>
      <div className="home-page flex flex-col sm:flex-row w-full min-h-screen">
        <SidebarWithRoleControl />
        <TopNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="ml-0 sm:ml-64 w-full bg-[#f4f4f4] p-8">
          <h1 className="text-3xl font-bold mb-6">Service Requests</h1>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Submit a New Service Request</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={newRequest.customerName}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="phoneModel"
                placeholder="Phone Model"
                value={newRequest.phoneModel}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              />
              <textarea
                name="issue"
                placeholder="Issue Description"
                value={newRequest.issue}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit Request
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Service Requests</h2>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left">Customer Name</th>
                  <th className="py-2 px-4 text-left">Phone Model</th>
                  <th className="py-2 px-4 text-left">Issue</th>
                  <th className="py-2 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {serviceRequests.map(request => (
                  <tr key={request.id} className="border-b">
                    <td className="py-2 px-4">{request.customerName}</td>
                    <td className="py-2 px-4">{request.phoneModel}</td>
                    <td className="py-2 px-4">{request.issue}</td>
                    <td className="py-2 px-4">{request.date}</td>
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

export default Service;