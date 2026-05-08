import connectDB from '../../../../lib/db';
import { getOffers, createOffer } from '../../../../controllers/offerController';

export default async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const Offers = await getOffers();
      res.status(200).json(Offers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch subcategories', error });
    }
  }

  if (req.method === 'POST') {
    try {
      const Offer = await createOffer(req.body);
      res.status(201).json(Offer);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create Offer', error });
    }
  }
};
