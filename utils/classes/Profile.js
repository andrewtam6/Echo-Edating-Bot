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

ProfileClass.getAllProfiles = async () => {
    const results = await profileSchema.find();
    return results;  
}

ProfileClass.getAllProfilesFiltered = async (filter) => {
    const results = await profileSchema.find(filter);
    return results;  
}

ProfileClass.checkData = async (number, data) => {
    // This isn't to be hateful. It's just to make coding easier. You are valid no matter what you identify as <3
    const genders = ['male', 'female', 'other'];

    if (!genders.contains(data) && number == 0) { return 'INVALID_GENDER_INPUT'; } 
    if (!isImage(data) && number == 2) { return 'INVALID_IMAGE_URL_INPUT'; } 
    if (!isNaN(parseInt(data)) && number == 1) { return 'INVALID_AGE_INPUT'; }

    return true;



}


function isImage(url) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

module.exports = ProfileClass;