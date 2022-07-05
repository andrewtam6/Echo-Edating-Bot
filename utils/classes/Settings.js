const settingsSchema = require("../../schemas/settingsSchema");

const SettingsClass = {};

SettingsClass.saveInitialSettings = (id, isUnder18) => {
    if (isUnder18 == true) {
        new settingsSchema({
            userId: id,
            ageRange: "13-18",
            preferredGender: "N/A",
        })
    } else {
        new settingsSchema({
            userId: id,
            ageRange: "N/A",
            preferredGender: "N/A",
        })
    }
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
