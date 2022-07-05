const mongoose = require('mongoose');

const settings = mongoose.Schema({
    userId: String,
    ageRange: String,
    
    preferredGender: String,
    isUnderEighteen: Boolean,
})

module.exports = mongoose.model('settings', settings, 'settings')