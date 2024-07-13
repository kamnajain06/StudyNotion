const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    gender : {
        type: String,
        enum:["Male", "Female", "Preferred not to say"]
    },
    dateOfBirth : {
        type: String,
    },
    about : {
        type: String,
    },
    phoneNumber : {
        type: String,
    },
})

module.exports= mongoose.model ("Profile", profileSchema);