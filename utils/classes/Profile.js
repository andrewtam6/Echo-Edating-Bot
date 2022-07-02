const profileSchema = require("../../schemas/profileSchema");

const ProfileClass = {};

ProfileClass.create = (id, gender, age, imageURL, bio) => {
    // Saves DB Data
    new profileSchema({
        userId: id,
        gender: gender,
        age: age,
        mainProfileImage: imageURL,
        bio: bio,
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