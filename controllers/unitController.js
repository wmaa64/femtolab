import Unit from '../models/Unit.js';

const getUnits = async () => {
    // Fetch Units from the database
    const units = await Unit.find().sort({ order: 1 });
    return units;
};

// Create a new Unit
const createUnit = async (data) => {
    const newUnit = new Unit(data);
    return await newUnit.save();
};

// Update a Unit
const updateUnit = async (req, res) => {
  try {
    const updatedUnit = await Unit.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUnit);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a Unit
const deleteUnit =  async (req, res) => {
  try {
    await Unit.findByIdAndDelete(req.params.id);
    res.status(200).json('Unit has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};

export { getUnits,createUnit,updateUnit, deleteUnit };