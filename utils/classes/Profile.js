const profileSchema = require("../../schemas/profileSchema");

const ProfileClass = {};

ProfileClass.create = (email, DOB, imageURL, Bio) => {
    // Saves DB Data
    new profileSchema({
        email: email, 
        DOB: DOB,
        mainProfileImage: imageURL,
        Bio: Bio,
    }).save();
    
}

module.exports = ProfileClass;