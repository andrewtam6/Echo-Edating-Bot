const mongoose = require('mongoose');

const profile = mongoose.Schema({
    userId: String,
    gender: String,
    DOB: String,
    mainProfileImage: String,
    Bio: String,
})

module.exports = mongoose.model('profile', profile, 'profiles')