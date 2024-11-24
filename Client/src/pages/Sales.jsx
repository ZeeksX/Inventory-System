import React, { useEffect, useState } from 'react';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import { AuthProvider } from '../components/Auth';
import TopNav from '../components/topnav/TopNav';

const Sales = ({ sidebarOpen, toggleSidebar }) => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [approvedSales, setApprovedSales] = useState(new Set()); // To track approved sales

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/request/purchase');
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    const fetchProductsData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products data');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products data:', error);
      }
    };

    fetchSalesData();
    fetchProductsData();
  }, []);

  useEffect(() => {
    if (sales.length > 0 && products.length > 0) {
      calculateTotals();
    }
  }, [sales, products]);

  useEffect(() => {
    // Load approved sales from localStorage when the component mounts
    const storedApprovedSales = JSON.parse(localStorage.getItem('approvedSales')) || [];
    setApprovedSales(new Set(storedApprovedSales));
  }, []);

  const getPriceByItemName = (itemName) => {
    const product = products.find(product => product.name === itemName);
    return product ? product.price : 0;
  };

  const calculateTotals = () => {
    const total = sales.reduce((acc, sale) => {
      const price = getPriceByItemName(sale.itemToPurchase);
      return acc + (price * sale.quantity);
    }, 0);
    const quantity = sales.reduce((acc, sale) => acc + sale.quantity, 0);
    setTotalSales(total);
    setTotalQuantity(quantity);
  };

  const handleApproveSale = async (sale) => {
    const { itemToPurchase, quantity } = sale;

    // Find the product to update
    const product = products.find(product => product.name === itemToPurchase);
    if (!product) {
      console.error('Product not found');
      return;
    }

    // Calculate new stock
    const newStock = product.stock - quantity;

    // Update the stock in the database
    try {
      const response = await fetch(`http://localhost:3000/api/v1/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: newStock }),
      });

      if (!response.ok) {
        throw new Error('Failed to update stock');
      }

      // Update local state
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === product.id ? { ...p, stock: newStock } : p
        )
      );

      // Update approved sales state
      const newApprovedSales = new Set(approvedSales);
      newApprovedSales.add(sale.id);
      setApprovedSales(newApprovedSales);

      // Store approved sales in localStorage
      localStorage.setItem('approvedSales', JSON.stringify(Array.from(newApprovedSales)));

      console.log('Sale approved and stock updated');
    } catch (error) {
      console.error('Error approving sale:', error);
    }
  };

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

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-2 sm:px-4 text-left">Model</th>
                  <th className="py-2 px-2 sm:px-4 text-left">Price</th>
                  <th className="py-2 px-2 sm:px-4 text-left">
                    <span className="hidden sm:inline">Quantity</span>
                    <span className="inline sm:hidden">Qty</span>
                  </th>
                  <th className="py-2 px-2 sm:px-4 text-left">Date</th>
                  <th className="py-2 px-2 sm:px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sales.map(sale => {
                  const price = getPriceByItemName(sale.itemToPurchase);
                  return (
                    <tr key={sale.id} className="border-b">
                      <td className="py-2 px-2 sm:px-4">{sale.itemToPurchase}</td>
                      <td className="py-2 px-2 sm:px-4">${price}</td>
                      <td className="py-2 px-2 sm:px-4">{sale.quantity}</td>
                      <td className="py-2 px-2 sm:px-4">{new Date(sale.date).toLocaleString()}</td>
                      <td className="py-2 px-2 sm:px-4">
                        {approvedSales.has(sale.id) ? (
                          <span className="text-green-500">Updated Inventory</span>
                        ) : (
                          <button
                            onClick={() => handleApproveSale(sale)}
                            className="bg-blue-500 text-white px-2 py-1 rounded-md"
                          >
                            Update Inventory
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Sales;