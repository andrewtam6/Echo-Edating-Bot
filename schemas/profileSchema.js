const mongoose = require('mongoose');

const profile = mongoose.Schema({
    email: String,
    DOB: String,
    mainProfileImage: String,
    Bio: String,
})

module.exports = mongoose.model('profile', profile, 'profiles')