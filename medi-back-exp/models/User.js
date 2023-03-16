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
        minlength: 6
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
        type: Number,
        required: true,
        default: 0
    }
    
})

module.exports = mongoose.model('User', userSchema);