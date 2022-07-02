const mongoose = require('mongoose');

const profile = mongoose.Schema({
    userId: String,
    gender: String,
    age: String,
    mainProfileImage: String,
    Bio: String,
})

module.exports = mongoose.model('profile', profile, 'profiles')