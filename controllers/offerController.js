import Offer from '../models/Offer.js';

const getOffers = async () => {
    // Fetch Offers from the database
    const Offers = await Offer.find().sort({ src: -1 });
                          
    return Offers;
};

const getOfferById = async (id) => {
    // Fetch Offer from the database
    const Offer = await Offer.findById(id);
    return Offer;
};

// Create a new Offer
const createOffer = async (data) => {
    const newOffer = new Offer(data);
    return await newOffer.save();
};

// Update a Offer
const updateOffer = async (id, data) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(id,
      { $set: data },
      { new: true }
    );
    return updatedOffer;
  } catch (err) {
    throw new Error("Error updating Offer");
  }
};

// Delete a Offer
const deleteOffer =  async (id) => {
  try {
    await Offer.findByIdAndDelete(id);
    return { message: 'Offer has been deleted...' };
  } catch (err) {
    throw new Error("Error deleting Offer");
  }
};

export { getOffers,getOfferById, createOffer,updateOffer, deleteOffer };