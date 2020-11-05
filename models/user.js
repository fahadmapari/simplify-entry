const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: Number,
    name: String,
    society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society'
    },
    type:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);