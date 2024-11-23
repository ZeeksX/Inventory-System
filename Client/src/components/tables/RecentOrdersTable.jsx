import React from 'react'

const RecentOrdersTable = ({orders}) => {
    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                <div className="overflow-scroll sm:overflow-hidden">
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
                            {orders.map((order) => (
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
        </>
    )
}

export default RecentOrdersTable