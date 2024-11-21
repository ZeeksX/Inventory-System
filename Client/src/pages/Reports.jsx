import React, { useState } from 'react';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import TopNav from '../components/topnav/TopNav';
import { AuthProvider } from '../components/Auth';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Reports = ({ toggleSidebar, sidebarOpen }) => {
  // Sample data for sales, orders, and services
  const [sales, setSales] = useState([
    { id: 1, model: 'iPhone 13', price: 799, quantity: 1, date: '2023-10-01' },
    { id: 2, model: 'Samsung Galaxy S21', price: 699, quantity: 2, date: '2023-10-02' },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, orderId: 'ORD001', customer: 'John Doe', total: 799, date: '2023-10-01' },
    { id: 2, orderId: 'ORD002', customer: 'Jane Smith', total: 1398, date: '2023-10-02' },
  ]);

  const [services, setServices] = useState([
    { id: 1, serviceId: 'SRV001', customer: 'Alice Johnson', service: 'Screen Replacement', date: '2023-10-01' },
    { id: 2, serviceId: 'SRV002', customer: 'Bob Brown', service: 'Battery Replacement', date: '2023-10-02' },
  ]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState('sales');

  // Filter functions
  const filterData = (data) => {
    return data.filter(item => {
      const itemDate = new Date(item.date);
      const isAfterStart = !startDate || itemDate >= startDate;
      const isBeforeEnd = !endDate || itemDate <= endDate;
      return isAfterStart && isBeforeEnd;
    });
  };

  // PDF Document components
  const SalesDocument = () => (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Sales Report</Text>
        {filterData(sales).map(sale => (
          <View key={sale.id} style={{ marginBottom: 10 }}>
            <Text>Model: {sale.model}</Text>
            <Text>Price: ${sale.price}</Text>
            <Text>Quantity: {sale.quantity}</Text>
            <Text>Date: {sale.date}</Text>
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
            <Text>Total: ${order.total}</Text>
            <Text>Date: {order.date}</Text>
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
            <Text>Customer: {service.customer}</Text>
            <Text>Service: {service.service}</Text>
            <Text>Date: {service.date}</Text>
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
                        <td className="py-2 px-4">{sale.model}</td>
                        <td className="py-2 px-4">${sale.price}</td>
                        <td className="py-2 px-4">{sale.quantity}</td>
                        <td className="py-2 px-4">{sale.date}</td>
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
                      <th className="py-2 px-4 text-left">Total</th>
                      <th className="py-2 px-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(orders).map(order => (
                      <tr key={order.id} className="border-b">
                        <td className="py-2 px-4">{order.orderId}</td>
                        <td className="py-2 px-4">{order.customer}</td>
                        <td className="py-2 px-4">${order.total}</td>
                        <td className="py-2 px-4">{order.date}</td>
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
                <h2 className="text-xl font-semibold mb-4">Filtered Service Data </h2>
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
                        <td className="py-2 px-4">{service.serviceId}</td>
                        <td className="py-2 px-4">{service.customer}</td>
                        <td className="py-2 px-4">{service.service}</td>
                        <td className="py-2 px-4">{service.date}</td>
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