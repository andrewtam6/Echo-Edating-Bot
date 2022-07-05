const mongoose = require('mongoose');

const profile = mongoose.Schema({
    userId: String,
    discordTag: String,
    
    gender: String,
    age: String,
    
    province: String,
    country: String,


    mainProfileImage: String,
    bio: String,
})

module.exports = mongoose.model('profile', profile, 'profiles')