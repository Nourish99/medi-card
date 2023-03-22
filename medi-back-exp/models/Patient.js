const mongoose = require("mongoose");
const { Schema } = mongoose;

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
        type: String
    },
    recomendations:{
        type: String
    },
    radiographies: {
        type: String
    },
    nurseNotes: {
        type: String
    },
    nursesAtendence: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    doctorAttendence:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    familiar:{
        type: Schema.Types.ObjectId, ref: 'User'
    }
});

module.exports.patientSchema = PatientSchema;


module.exports.patientModel = mongoose.model('Patient', PatientSchema);
