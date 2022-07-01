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

ProfileClass.hasProfile = async (email) => {
    const result = await profileSchema.findOne({ email: email });
    if (result == null) {
        return false;
    }
    return true;
}

module.exports = ProfileClass;