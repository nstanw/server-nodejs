const mongoose = require('mongoose');

// Define the schema for the Google account
const googleAccountSchema = new mongoose.Schema({
    gmail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    info: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Create the Google account model
const GoogleAccount = mongoose.model('Acc', googleAccountSchema);

module.exports = GoogleAccount;