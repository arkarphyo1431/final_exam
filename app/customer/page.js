"use client";

import React, { useState, useEffect } from "react";

// Base URL for your API (adjust as necessary)
const API_BASE_URL = "/api/customer";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    memberNumber: "",
    interests: "",
    email: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });
  const [editCustomerId, setEditCustomerId] = useState(null);

  // Fetch all customers on component load
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add a new customer or update an existing one
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editCustomerId ? "PUT" : "POST";
    const url = editCustomerId ? `${API_BASE_URL}/${editCustomerId}` : API_BASE_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Refresh the customer list
        fetchCustomers();
        // Reset form
        setFormData({
          name: "",
          dateOfBirth: "",
          memberNumber: "",
          interests: "",
          email: "",
          phoneNumber: "",
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
          },
        });
        setEditCustomerId(null); // Exit edit mode if updating
      }
    } catch (error) {
      console.error("Error submitting customer:", error);
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      fetchCustomers(); // Refresh the customer list
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Set the form for editing a customer
  const handleEdit = (customer) => {
    setEditCustomerId(customer._id);
    setFormData(customer);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

      {/* Customer Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border px-2 py-1 mb-2"
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="border px-2 py-1 mb-2"
          />
        </div>
        <div>
          <label>Member Number</label>
          <input
            type="number"
            name="memberNumber"
            value={formData.memberNumber}
            onChange={handleChange}
            required
            className="border px-2 py-1 mb-2"
          />
        </div>
        <div>
          <label>Interests</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="border px-2 py-1 mb-2"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border px-2 py-1 mb-2"
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border px-2 py-1 mb-2"
          />
        </div>
        <div>
          <label>Address</label>
          <div>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
              placeholder="Street"
              className="border px-2 py-1 mb-2"
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
              placeholder="City"
              className="border px-2 py-1 mb-2"
            />
          </div>
          <div>
            <input
              type="text"
              name="state"
              value={formData.address.state}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
              placeholder="State"
              className="border px-2 py-1 mb-2"
            />
          </div>
          <div>
            <input
              type="text"
              name="zipCode"
              value={formData.address.zipCode}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, zipCode: e.target.value } })}
              placeholder="Zip Code"
              className="border px-2 py-1 mb-2"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editCustomerId ? "Update Customer" : "Add Customer"}
        </button>
      </form>

      {/* Customer List */}
      <h2 className="text-xl font-bold mb-4">Customers List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id} className="border-b py-2 flex justify-between">
            <span>{customer.name} ({customer.email})</span>
            <div>
              <button onClick={() => handleEdit(customer)} className="text-blue-500 mr-2">
                Edit
              </button>
              <button onClick={() => handleDelete(customer._id)} className="text-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
