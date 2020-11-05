const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    loggedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    society: String,
    societyOwner: mongoose.ObjectId,
    type:{
        type: String,
        enum: ['entry', 'exit'] 
    },
    loggedAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Log', logSchema);