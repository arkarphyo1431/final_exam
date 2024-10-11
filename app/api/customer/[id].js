// app/api/customer/[id].js

import dbConnect from '../../../lib/db';
import Customer from '../../../models/Customer';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { query: { id }, method } = req;
  
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const customer = await Customer.findById(id);
        if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    case 'PUT':
      try {
        const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
          return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(204).json();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
