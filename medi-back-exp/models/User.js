const mongoose = require('mongoose');

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
        enum : ['doctor','nurse','admin'],
        default: 'doctor'
    }
    
})

module.exports = mongoose.model('User', userSchema);