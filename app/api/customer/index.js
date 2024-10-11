// app/api/customer/index.js

import dbConnect from '../../../lib/db';
import Customer from '../../../models/Customer';

export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === 'GET') {
    try {
      const customers = await Customer.find({});
      res.status(200).json(customers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
