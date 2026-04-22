import mongoose from "mongoose";

const UnitSchema = new mongoose.Schema({
    name: {
        en: {type: String, required: true },
        ar: {type: String, required: true }
    }
});

const Unit = mongoose.models.Unit || mongoose.model('Unit', UnitSchema);

export default Unit ;