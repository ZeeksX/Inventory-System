import React, { useEffect, useState } from 'react';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import TopNav from '../components/topnav/TopNav';
import { AuthProvider } from '../components/Auth';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Reports = ({ toggleSidebar, sidebarOpen }) => {
  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]); // New state for products

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState('sales');

  // Fetch data from the API
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

    const fetchOrdersData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/request/purchase');
        if (!response.ok) {
          throw new Error('Failed to fetch orders data');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders data:', error);
      }
    };

    const fetchServicesData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/request/service');
        if (!response.ok) {
          throw new Error('Failed to fetch services data');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services data:', error);
      }
    };

    const fetchProductsData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products data');
        }
        const data = await response.json();
        setProducts(data); // Store products in state
      } catch (error) {
        console.error('Error fetching products data:', error);
      }
    };

    fetchSalesData();
    fetchOrdersData();
    fetchServicesData();
    fetchProductsData(); // Fetch products data
  }, []);

  // Filter functions
  const filterData = (data) => {
    return data.filter(item => {
      const itemDate = new Date(item.date).toLocaleString();
      const isAfterStart = !startDate || itemDate >= startDate;
      const isBeforeEnd = !endDate || itemDate <= endDate;
      return isAfterStart && isBeforeEnd;
    });
  };

  // Function to get price by model name
  const getPriceByModel = (model) => {
    const product = products.find(product => product.name === model);
    return product ? product.price : 0; // Return price or 0 if not found
  };

  // PDF Document components
  const SalesDocument = () => (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Sales Report</Text>
        {filterData(sales).map(sale => (
          <View key={sale.id} style={{ marginBottom: 10 }}>
            <Text>Model: {sale.itemToPurchase}</Text>
            <Text>Price: ${getPriceByModel(sale.itemToPurchase)}</Text>
            <Text>Quantity: {sale.quantity}</Text>
            <Text>Date: {new Date(sale.date).toLocaleString()}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  const OrdersDocument = () => (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Orders Report</Text>
        {filterData(orders).map(order => (
          <View key={order.id} style={{ marginBottom: 10 }}>
            <Text>Order ID: {order.orderId}</Text>
            <Text>Customer: {order.customer}</Text>
            <Text>Item Bought: {order.itemToPurchase}</Text>
            <Text>Total: ${order.totalCost}</Text>
            <Text>Date: {new Date(order.date).toLocaleString()}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  const ServicesDocument = () => (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Service Report</Text>
        {filterData(services).map(service => (
          <View key={service.id} style={{ marginBottom: 10 }}>
            <Text>Service ID: {service.serviceId}</Text>
            <Text>Customer: {service.customerName}</Text>
            <Text>Service: {service.issueDescription}</Text>
            <Text>Date: {new Date(service.date).toLocaleString()}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  return (
    <AuthProvider>
      <div className="home-page flex flex-col sm:flex-row w-full min-h-screen">
        <SidebarWithRoleControl />
        <TopNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="sm:ml-64 w-full bg-[#f4f4f4] p-8 ml-0">
          <h1 className="text-3xl font-bold mb-6">Reports</h1>

          <div className="mb-6 flex flex-col w-full gap-2 sm:w-1/2 sm:flex-row justify-between">
            <div className='flex flex-row gap-4 items-center'>
              <label className='w-20'>Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="border border-gray-300 rounded p-2"
              />
            </div>
            <div className='flex flex-row items-center gap-4'>
              <label className="ml-0 sm:ml-4 w-20">End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="border border-gray-300 rounded p-2"
              />
            </div>
          </div>

          <div className="flex mb-6">
            <button onClick={() => setActiveTab('sales')} className={`mr-4 ${activeTab === 'sales' ? 'font-bold' : ''}`} aria-label="Sales Report">
              Sales Report
            </button>
            <button onClick={() => setActiveTab('orders')} className={`mr-4 ${activeTab === 'orders' ? 'font-bold' : ''}`} aria-label="Orders Report">
              Orders Report
            </button>
            <button onClick={() => setActiveTab('services')} className={`mr-4 ${activeTab === 'services' ? 'font-bold' : ''}`} aria-label="Service Report">
              Service Report
            </button>
          </div>

          {activeTab === 'sales' && (
            <>
              <PDFDownloadLink document={<SalesDocument />} fileName="sales_report.pdf">
                {({ loading }) => (loading ? 'Loading document...' : 'Download Sales Report')}
              </PDFDownloadLink>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Filtered Sales Data</h2>
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-2 px-4 text-left">Model</th>
                      <th className="py-2 px-4 text-left">Price</th>
                      <th className="py-2 px-4 text-left">Quantity</th>
                      <th className="py-2 px-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(sales).map(sale => (
                      <tr key={sale.id} className="border-b">
                        <td className="py-2 px-4">{sale.itemToPurchase}</td>
                        <td className="py-2 px-4">${getPriceByModel(sale.itemToPurchase)}</td>
                        <td className="py-2 px-4">{sale.quantity}</td>
                        <td className="py-2 px-4">{new Date(sale.date).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <>
              <PDFDownloadLink document={<OrdersDocument />} fileName="orders_report.pdf">
                {({ loading }) => (loading ? 'Loading document...' : 'Download Orders Report')}
              </PDFDownloadLink>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Filtered Orders Data</h2>
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-2 px-4 text-left">Order ID</th>
                      <th className="py-2 px-4 text-left">Customer</th>
                      <th className="py-2 px-4 text-left">Item Bought</th>
                      <th className="py-2 px-4 text-left">Total</th>
                      <th className="py-2 px-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(orders).map(order => (
                      <tr key={order.id} className="border-b">
                        <td className="py-2 px-4">ORD{order.id}</td>
                        <td className="py-2 px-4">{order.username}</td>
                        <td className="py-2 px-4">{order.itemToPurchase}</td>
                        <td className="py-2 px-4">${order.totalCost}</td>
                        <td className="py-2 px-4">{new Date(order.date).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'services' && (
            <>
              <PDFDownloadLink document={<ServicesDocument />} fileName="services_report.pdf">
                {({ loading }) => (loading ? 'Loading document...' : 'Download Service Report')}
              </PDFDownloadLink>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Filtered Service Data</h2>
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-2 px-4 text-left">Service ID</th>
                      <th className="py-2 px-4 text-left">Customer</th>
                      <th className="py-2 px-4 text-left">Service</th>
                      <th className="py-2 px-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(services).map(service => (
                      <tr key={service.id} className="border-b">
                        <td className="py-2 px-4">SERV{service.id}</td>
                        <td className="py-2 px-4">{service.customerName}</td>
                        <td className="py-2 px-4">{service.issueDescription}</td>
                        <td className="py-2 px-4">{new Date(service.date).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </AuthProvider>
  );
};

export default Reports;