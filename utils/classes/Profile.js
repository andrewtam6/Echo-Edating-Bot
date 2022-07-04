const profileSchema = require("../../schemas/profileSchema");
const JIMP = require('jimp');
const { ImgurClient } = require('imgur');

const client = new ImgurClient({
    clientId: process.env.IMGUR_CLIENT_ID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET
})

const ProfileClass = {};

ProfileClass.create = (id, gender, age, imageURL, bio) => {
    JIMP.read(imageURL, async (err, img) => {
        if (err) throw err;
        img.resize(400, 400).getBase64(JIMP.AUTO, async (e, i) => {
            if (e) throw e;
            const b64 = i.split('data:image/jpeg;base64,')[1];
            const results = await client.upload({
                image: b64,
                type: 'base64'
            }).catch(err => console.error(err));
            // Saves DB Data
            new profileSchema({
                userId: id,
                gender: gender,
                age: age,
                mainProfileImage: results.data.link,
                bio: bio,
            }).save();
        })

    })
    setTimeout(() => {

    }, 2e3)
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

    if (!genders.includes(data.toLowerCase()) && number == 0) { return {
        error: 'INVALID_GENDER_INPUT',
        validInputs: genders,
    }; } 
    if (!isImage(data) && number == 2) { return {
        error: 'INVALID_IMAGE_URL_INPUT',
        validInputs: 'Any url that leads to an image.'
    }; } 
    if (isNaN(parseInt(data)) && number == 1) { return {
        error: 'INVALID_AGE_INPUT',
        validInputs: 'A number representing your age.'
    }; }

    return true;



}


function isImage(url) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

module.exports = ProfileClass;