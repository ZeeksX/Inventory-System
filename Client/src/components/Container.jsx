import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2'; // Uncomment this line when you want to use the chart

const Container = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // Sample data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/users", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setTotalUsers(data.length); // Set total users
      } else {
        console.error("Failed to fetch users:", res.statusText);
      }
    } catch (error) {
      console.error("API link not working", error);
    }
  };

  const getOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/orders", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setTotalOrders(data.length); // Set total orders
        console.log(data); // Log the fetched orders
      } else {
        console.error("Failed to fetch orders:", res.statusText);
      }
    } catch (error) {
      console.error("API link not working", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getUsers(), getOrders()]); // Fetch users and orders concurrently
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  return (
    <div className="w-auto bg-[#f4f4f4] p-8 md:ml-64 sm:ml-0 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Card 1: Total Sales */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-2xl font-bold">$12,345</p>
        </div>

        {/* Card 2: Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{totalUsers}</p> {/* Display total users */}
        </div>

        {/* Card 3: Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold">{totalOrders}</p> {/* Display total orders */}
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
        {/* <Line data={data} /> Uncomment this line when you want to use the chart */}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text -xl font-semibold mb-4">Recent Activity</h2>
        <ul>
          <li className="border-b py-2">User  John Doe made a purchase of $100.</li>
          <li className="border-b py-2">User  Jane Smith registered.</li>
          <li className="border-b py-2">User  Alex Johnson updated their profile.</li>
          <li className="border-b py-2">User  Emily Davis made a purchase of $50.</li>
        </ul>
      </div>
    </div>
  );
};

export default Container;