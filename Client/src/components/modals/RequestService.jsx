import React from 'react';

const RequestService = ({ newRequest, handleInputChange, handleSubmitService, closeModal }) => {
    return (
        <form onSubmit={handleSubmitService} className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Submit a New Service Request</h2>
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
                type="email"
                name="customerEmail"
                placeholder="Customer Email"
                value={newRequest.customerEmail}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
            />
            <input
                type='tel'
                name="phoneNumber"
                placeholder="Phone Number"
                value={newRequest.phoneNumber}
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
            <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit Request
                </button>
                <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default RequestService;