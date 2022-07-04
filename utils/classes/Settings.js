const settingsSchema = require("../../schemas/settingsSchema");

const SettingsClass = {};

SettingsClass.saveInitialSettings = (id) => {
    new settingsSchema({
        userId: id,
        ageRange: "N/A",
        preferredGender: "N/A",
    })
}

SettingsClass.hasFilter = async (id) => {
    if (this.getFilter(id) == null) {
        return false;
    }
    return true;
}

SettingsClass.getFilter = async (id) => {
    const result = await settingsSchema.findOne({ userId: id });
    return result;
}

module.exports = SettingsClass;
