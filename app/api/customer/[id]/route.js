import dbConnect from '../../../../lib/db';
import Customer from '../../../../models/Customer';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const customer = await Customer.findById(id);
        if (!customer) {
          return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
      } catch (error) {
        res.status(400).json({ error: error.toString() });
      }
      break;

    case 'PUT':
      try {
        const body = await req.body; // Parse the request body for update
        const customer = await Customer.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!customer) {
          return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
      } catch (error) {
        res.status(400).json({ error: error.toString() });
      }
      break;

    case 'DELETE':
      try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
          return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(204).end(); // No content to send back
      } catch (error) {
        res.status(400).json({ error: error.toString() });
      }
      break;

    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
}
