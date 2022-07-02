const profileSchema = require("../../schemas/profileSchema");

const ProfileClass = {};

ProfileClass.create = (id, DOB, imageURL, Bio) => {
    // Saves DB Data
    new profileSchema({
        userId: id, 
        DOB: DOB,
        mainProfileImage: imageURL,
        Bio: Bio,
    }).save();
}

ProfileClass.hasProfile = async (id) => {
    const result = await profileSchema.findOne({ id: id });
    if (result == null) {
        return false;
    }
    return true;
}

ProfileClass.getProfile = async (id) => {
    const result = await profileSchema.findOne({id: id});
    if (result == null) return false;
    return result;
}

module.exports = ProfileClass;