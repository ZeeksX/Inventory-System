import React, { useEffect, useState } from 'react';

const Container = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]); // New state for low stock products

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/users", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setTotalUsers(data.length);
      } else {
        console.error("Failed to fetch users:", res.statusText);
      }
    } catch (error) {
      console.error("API link not working", error);
    }
  };

  const getOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/request/purchase", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setTotalOrders(data.length);

        const total = data.reduce((sum, order) => {
          const cost = order.totalCost || 0;
          return sum + cost;
        }, 0);

        setTotalSales(total);

        const activities = data.map(order => ({
          message: `User  ${order.username} made a purchase of $${order.totalCost}.`,
          date: new Date(order.date).toLocaleString(),
        }));
        setRecentActivities(activities.slice(-5));
      } else {
        console.error("Failed to fetch orders:", res.statusText);
      }
    } catch (error) {
      console.error("API link not working", error);
    }
  };

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/products", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        // Filter products with quantity less than 10
        const lowStock = data.filter(product => product.stock < 10);
        setLowStockProducts(lowStock);
      } else {
        console.error("Failed to fetch products:", res.statusText);
      }
    } catch (error) {
      console.error("API link not working", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getUsers(), getOrders(), getProducts()]); // Fetch users, orders, and products concurrently
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-auto bg-[#f4f4f4] p-8 sm:ml-0 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Card 1: Total Sales */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-2xl font-bold">${totalSales}</p>
        </div>

        {/* Card 2: Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>

        {/* Card 3: Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>
        <ul>
          {lowStockProducts.length > 0 ? (
            lowStockProducts.map((product, index) => (
              <li key={index} className="border-b py-2">
                {product.name} - Quantity remaining: {product.stock}
              </li>
            ))
          ) : (
            <li className="py-2 text-gray-500">No low stock products.</li>
          )}
        </ul>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index} className="border-b py-2">
              {activity.message} <span className="text-gray-500">({activity.date})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Container;