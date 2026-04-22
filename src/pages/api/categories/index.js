import connectDB from '../../../../lib/db';
import { getCategoryWithSubCategory } from '../../../../controllers/categoryController';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    return getCategoryWithSubCategory(req, res); // ✅ هنا الحل
  }

  res.status(405).json({ message: 'Method not allowed' });
}