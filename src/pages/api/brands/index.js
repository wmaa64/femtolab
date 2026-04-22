import connectDB from '../../../../lib/db';
import { getBrands, createBrand } from '../../../../controllers/brandController';

export default async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const brands = await getBrands();
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch subcategories', error });
    }
  }

  if (req.method === 'POST') {
    try {
      const brand = await createBrand(req.body);
      res.status(201).json(brand);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create brand', error });
    }
  }
};
