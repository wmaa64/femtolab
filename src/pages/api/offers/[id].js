import connectDB from '../../../../lib/db';
import { getOfferById, updateOffer, deleteOffer } from '../../../../controllers/offerController';

export default async (req, res) => {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const Offer = await getOfferById(id);
      if (!Offer) return res.status(404).json({ message: 'Not found' });
      res.status(200).json(Offer);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Offer', error });
    }
  }

  if (req.method === 'PUT') {
    try {
      const updated = await updateOffer(id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating Offer', error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await deleteOffer(id);
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting Offer', error });
    }
  }
};
