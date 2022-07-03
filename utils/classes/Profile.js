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

ProfileClass.checkData = async (data) => {
    const errors = [];
    // This isn't to be hateful. It's just to make coding easier. You are valid no matter what you identify as <3
    const genders = ['male', 'female', 'other'];

    if (!genders.contains(data.gender)) { errors.push(`INVALID_GENDER_INPUT`); } 
    if (!isImage(data.imageURL)) { errors.push('INVALID_IMAGE_URL_INPUT'); } 
    if (!isNaN(parseInt(data.age))) { errors.push('INVALID_AGE_INPUT'); }

    if (errors.length == 0) {
        return true;
    } else {
        return errors;
    }


}


function isImage(url) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

module.exports = ProfileClass;