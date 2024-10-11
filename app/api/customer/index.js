import dbConnect from '../../../lib/db';
import Customer from '../../../models/Customer';

// GET all customers
export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    try {
      const customers = await Customer.find({});
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
// POST a new customer
if (req.method === 'POST') {
    try {
      const newCustomer = new Customer(req.body);
      await newCustomer.save();
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(400).json({ error: error.toString() });
    }
  }
