import React from 'react'

const ServiceRequestTable = ({serviceRequests}) => {
    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Recent Service Requests</h2>
                <div className="overflow-scroll sm:overflow-hidden">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 text-left">Customer Name</th>
                                <th className="py-2 px-4 text-left">Phone Model</th>
                                <th className="py-2 px-4 text-left">Issue</th>
                                <th className="py-2 px-4 text-left">Date</th>
                                <th className="py-2 px-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceRequests.map((request) => (
                                <tr key={request.id} className="border-b">
                                    <td className="py-2 px-4">{request.customerName}</td>
                                    <td className="py-2 px-4">{request.phoneModel}</td>
                                    <td className="py-2 px-4">{request.issueDescription}</td>
                                    <td className="py-2 px-4">{new Date(request.date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default ServiceRequestTable