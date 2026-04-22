import connectDB from '../../../../lib/db';
import { getUnits, createUnit } from '../../../../controllers/unitController';

export default async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const units = await getUnits();
      res.status(200).json(units);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch Units', error });
    }
  }

  if (req.method === 'POST') {
    try {
      const unit = await createUnit(req.body);
      res.status(201).json(unit);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create unit', error });
    }
  }
};
