const Legal = require('../models/LegalModel');

// ⚡ Get Legal Content dynamically
const getLegalContent = async (req, res) => {
    try {
        const { type } = req.params;
        const data = await Legal.findOne({ pageType: type });
        
        if (!data) {
            return res.status(404).send({ success: false, message: "Policy not found" });
        }
        
        res.status(200).send({ success: true, data });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error in fetching policy", error });
    }
};

// ⚡ Post/Update Legal Content (For Admin)
const updateLegalContent = async (req, res) => {
    try {
        const { pageType, heroTitle, lastUpdated, sections } = req.body;
        const updated = await Legal.findOneAndUpdate(
            { pageType },
            { heroTitle, lastUpdated, sections },
            { new: true, upsert: true } // Upsert: Agar nahi hai toh bana do, hai toh update kar do
        );
        res.status(201).send({ success: true, message: "Policy Updated!", updated });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error in updating", error });
    }
};

module.exports = { getLegalContent, updateLegalContent };