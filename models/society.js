const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
    societyName: String,
    qrSVG: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});



module.exports = mongoose.model('Society', societySchema);