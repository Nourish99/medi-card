const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    lastname:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    age:{
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    address:{
        type: String,
        min: 6,
        max: 255
    },
    birthdate: {
        type: Date,
        default: Date.now
    },
    gender:{
        type: String,
        enum : ['hombre','mujer','otro'],
        default: 'hombre'
    },
    room:{
        type: Number,
        default: 0
    },
    illness:{
        type: String
    },
    medicines:{
        type: [String]
    },
    recomendations:{
        type: [String]
    }
});

module.exports = mongoose.model('Patient', PatientSchema);
