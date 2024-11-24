import React from 'react'

const RecentOrdersTable = ({ orders, onUpdateStatus }) => {
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
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b">
                                    <td className="py-2 px-4">{order.username}</td>
                                    <td className="py-2 px-4">{order.itemToPurchase}</td>
                                    <td className="py-2 px-4">${order.totalCost}</td>
                                    <td className="py-2 px-4">{new Date(order.date).toLocaleString()}</td>
                                    <td className="py-2 px-4">{order.status}</td>
                                <td className="py-2 px-4">
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => onUpdateStatus(order.id, 'successful')}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => onUpdateStatus(order.id, 'rejected')}
                                    >
                                        Reject
                                    </button>
                                </td>
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