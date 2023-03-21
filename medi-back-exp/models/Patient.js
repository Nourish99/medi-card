const mongoose = require("mongoose");
const {userSchema} = require("./User")

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
    },
    radiographies: {
        type: [String]
    },
    nurseNotes: {
        type: String
    },
    nursesAtendence: {
        type: [userSchema]
    },
    doctorAttendence:{
        type: userSchema,
        default: undefined
    },
    familiar:{
        type: userSchema,
        default: undefined
    }
});

module.exports.patientSchema = PatientSchema;


module.exports.patientModel = mongoose.model('Patient', PatientSchema);
