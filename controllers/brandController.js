import Brand from '../models/Brand.js';

const getBrands = async () => {
    // Fetch Brands from the database
    const Brands = await Brand.find().sort({ order: 1 });
    return Brands;
};

// Create a new brand
const createBrand = async (data) => {
    const newBrand = new Brand(data);
    return await newBrand.save();
};

// Update a brand
const updateBrand = async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBrand);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a brand
const deleteBrand =  async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json('Brand has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};

export { getBrands,createBrand,updateBrand, deleteBrand };