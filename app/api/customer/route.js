import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';
// GET all customers and POST new customer
export default async function handler(req, res) {
  await dbConnect();
  
  switch (req.method) {
    case 'GET':
      try {
        const customers = await Customer.find({});
        res.status(200).json(customers);
      } catch (error) {
        res.status(500).json({ error: error.toString() });
      }
      break;
      
    case 'POST':
      try {
        const body = await req.body; // Parse the request body
        const newCustomer = new Customer(body);
        await newCustomer.save();
        res.status(201).json(newCustomer);
      } catch (error) {
        res.status(400).json({ error: error.toString() });
      }
      break;

    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
}
