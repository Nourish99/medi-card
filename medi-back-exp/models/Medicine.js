const mongoose = require("mongoose");

const MedicineSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    stock:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dosage:{
        dosageQuant:{
            type: Number,
            required: true,
            
        },
        dosageType:{
            type: String,
            min: 6,
            max: 255
        }
    },
    composes:{
        type: [String]
    }
});

module.exports = mongoose.model('Medicine', PatientSchema);
