import React, { useEffect, useState } from 'react';
import { AuthProvider } from '../components/Auth';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import TopNav from '../components/topnav/TopNav';


const Service = ({ toggleSidebar, sidebarOpen }) => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch service requests and orders from the backend
    const fetchServiceRequests = async () => {
      // Replace with your actual API endpoint for service requests
      const response = await fetch('http://localhost:3000/api/service-requests');
      const data = await response.json();
      setServiceRequests(data);
    };

    const fetchOrders = async () => {
      const response = await fetch('http://localhost:3000/api/orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchServiceRequests();
    fetchOrders();
  }, []);
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
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Service Requests</h2>
            <div className='overflow-scroll sm:overflow-hidden'>
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

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className='overflow-scroll sm:overflow-hidden'>
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left">Customer Name</th>
                    <th className="py-2 px-4 text-left">Item</th>
                    <th className="py-2 px-4 text-left">Total Price</th>
                    <th className="py-2 px-4 text-left">Order Date</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2 px-4">{order.customerName}</td>
                      <td className="py-2 px-4">{order.item}</td>
                      <td className="py-2 px-4">${order.totalPrice.toFixed(2)}</td>
                      <td className="py-2 px-4">{order.orderDate}</td>
                      <td className="py-2 px-4">{order.status}</td>
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

export default Service;