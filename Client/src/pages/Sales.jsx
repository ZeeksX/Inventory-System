import React, { useState } from 'react';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl'; // Import the SidebarWithRoleControl
import { AuthProvider } from '../components/Auth';
import TopNav from '../components/topnav/TopNav';

const Sales = ({ sidebarOpen, toggleSidebar }) => {
  // Sample sales data
  const [sales, setSales] = useState([
    { id: 1, model: 'iPhone 13', price: 799, quantity: 1, date: '2023-10-01' },
    { id: 2, model: 'Samsung Galaxy S21', price: 699, quantity: 2, date: '2023-10-02' },
    { id: 3, model: 'Google Pixel 6', price: 599, quantity: 1, date: '2023-10-03' },
    { id: 4, model: 'OnePlus 9', price: 729, quantity: 1, date: '2023-10-04' },
  ]);

  const totalSales = sales.reduce((acc, sale) => acc + sale.price * sale.quantity, 0);
  const totalQuantity = sales.reduce((acc, sale) => acc + sale.quantity, 0);

  return (
    <AuthProvider>
      <div className="home-page flex flex-col sm:flex-row w-full min-h-screen">
        <SidebarWithRoleControl />
        <TopNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="ml-0 sm:ml-64 w-full bg-[#f4f4f4] p-8">
          <h1 className="text-3xl font-bold mb-6">Sales</h1>

          <div className="bg-white p-6 flex flex-row justify-between rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Total Sales: ${totalSales}</h2>
            <h2 className="text-xl font-semibold mb-4">Total Quantity Sold: {totalQuantity}</h2>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left">Model</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map(sale => (
                  <tr key={sale.id} className="border-b">
                    <td className="py-2 px-4">{sale.model}</td>
                    <td className="py-2 px-4">${sale.price}</td>
                    <td className="py-2 px-4">{sale.quantity}</td>
                    <td className="py-2 px-4">{sale.date}</td>
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

export default Sales;