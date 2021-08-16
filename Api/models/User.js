const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: 'string',
        required: true
    },
    passwordHash : {
        type: 'string',
        required: true
    },
    role: {
        type: 'string',
        default: 'user'
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;