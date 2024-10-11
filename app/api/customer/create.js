// app/api/customer/create.js

import dbConnect from '../../../lib/db';
import Customer from '../../../models/Customer';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const customer = new Customer(req.body);
      await customer.save();
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
