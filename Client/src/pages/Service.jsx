import React, { useEffect, useState } from 'react';
import { AuthProvider } from '../components/Auth';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import TopNav from '../components/topnav/TopNav';
import ServiceRequestTable from '../components/tables/ServiceRequestTable';
import RecentOrdersTable from "../components/tables/RecentOrdersTable";

const Service = ({ toggleSidebar, sidebarOpen }) => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newRequest, setNewRequest] = useState({
    customerName: '',
    phoneModel: '',
    issueDescription: '',
  });
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/request/service');
        if (!response.ok) {
          throw new Error('Failed to fetch service requests');
        }
        const data = await response.json();
        setServiceRequests(data);
      } catch (error) {
        console.error('Error fetching service requests:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/request/purchase');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchServiceRequests();
    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newRequest.customerName && newRequest.phoneModel && newRequest.issueDescription) {
      try {
        const response = await fetch('http://localhost:3000/api/v1/request/service', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRequest),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to submit service request');
        }

        const result = await response.json();
        setServiceRequests([...serviceRequests, result]); // Add the new service request to the local state
        setNewRequest({ customerName: '', phoneModel: '', issueDescription: '' }); // Reset form
        setFeedback({ message: 'Service request submitted successfully!', type: 'success' });
      } catch (error) {
        console.error('Error submitting service request:', error);
        setFeedback({ message: error.message || 'Error submitting service request', type: 'error' });
      }
    } else {
      setFeedback({ message: 'All fields are required', type: 'error' });
    }
  };

  const handleUpdateStatus = async (id, newStatus, isOrder = false) => {
    const endpoint = isOrder
      ? `http://localhost:3000/api/v1/request/purchase/${id}`
      : `http://localhost:3000/api/v1/request/service/${id}`;

    try {
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }), // Send the new status
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      const updatedRequest = await response.json();

      if (isOrder) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedRequest.id ? updatedRequest : order
          )
        );
      } else {
        setServiceRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === updatedRequest.id ? updatedRequest : request
          )
        );
      }

      setFeedback({ message: 'Status updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating status:', error);
      setFeedback({ message: error.message || 'Error updating status', type: 'error' });
    }
  };

  return (
    <AuthProvider>
      <div className="home-page flex flex-col sm:flex-row w-full min-h-screen">
        <SidebarWithRoleControl />
        <TopNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="ml-0 sm:ml-64 w-full bg-[#f4f4f4] p-8">
          <h1 className="text-3xl font-bold mb-6">Service Requests</h1>

          {/* Feedback Section */}
          {feedback.message && (
            <div
              className={`p-4 mb-4 ${feedback.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                } rounded`}
            >
              {feedback.message}
            </div>
          )}

          {/* New Service Request Form */}
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
                name="issueDescription"
                placeholder="Issue Description"
                value={newRequest.issueDescription}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit Request
              </button>
            </form>
          </div>

          {/* Service Requests Table */}
          <ServiceRequestTable
            serviceRequests={serviceRequests}
            onUpdateStatus={(id, newStatus) => handleUpdateStatus(id, newStatus, false)} // Pass the function here
          />

          <RecentOrdersTable
            orders={orders}
            onUpdateStatus={(id, newStatus) => handleUpdateStatus(id, newStatus, true)} // Pass the function here
          />
        </div>
      </div>
    </AuthProvider>
  );
};

export default Service;