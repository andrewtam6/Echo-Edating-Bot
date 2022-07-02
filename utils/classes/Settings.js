const settingsSchema = require("../../schemas/settingsSchema");

const SettingsClass = {};

SettingsClass.saveInitialSettings = (id) => {
    new settingsSchema({
        userId: id,
        ageRange: "0-1000000000000000000000000000000000000000000000000000000",
        preferredGender: "N/A",
    })
}

module.exports = SettingsClass;