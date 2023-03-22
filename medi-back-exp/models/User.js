const mongoose = require('mongoose');

const {Schema} = mongoose

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        enum : ['hombre','mujer','otro'],
        default: 'hombre'
    },
    role:{
        type: String,
        required: true,
        enum : ['doctor','nurse','admin', 'familiar'],
        default: 'doctor'
    },
    doctor:{
        cedule: {
            type: String
        }
    },
    nurse: {
        schedule: {
            type: String,
            enum : ['matutino','vespertino','mixto'],
            default: 'matutino'
        }
    },
    familiar:{
        type: Schema.Types.ObjectId, ref: 'Patient'
    }
    
})

module.exports.userSchema = userSchema;

module.exports.userModel = mongoose.model('User', userSchema);