import mongoose from 'mongoose';

const offerSchema = mongoose.Schema(
  {
    src: { type: String, required: true },
    link: { type: String, required: true },
  }
);

const Offer = mongoose.models.Offer || mongoose.model('Offer', offerSchema);
export default Offer;
