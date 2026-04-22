import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    name: {
        en: {type: String, required: true },
        ar: {type: String, required: true }
    },
    description: {
        en: { type: String },
        ar: { type: String }
    }
});

const Brand = mongoose.models.Brand || mongoose.model('Brand', BrandSchema);

export default Brand ;