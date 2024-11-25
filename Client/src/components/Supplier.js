const API_BASE_URL = 'http://localhost:3000/api/v1/suppliers';

export const getSuppliers = async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch suppliers');
    }
    return await response.json();
};

export const getSupplierById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch supplier with ID: ${id}`);
    }
    return await response.json();
};

export const createSupplier = async (supplierData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
    });
    if (!response.ok) {
        throw new Error('Failed to create supplier');
    }
    return await response.json();
};

export const updateSupplier = async (id, supplierData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
    });
    if (!response.ok) {
        throw new Error(`Failed to update supplier with ID: ${id}`);
    }
    return await response.json();
};

export const deleteSupplier = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to delete supplier with ID: ${id}`);
    }
};