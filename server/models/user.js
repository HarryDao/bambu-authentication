const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    verify: {
        type: String
    }
});

module.exports = Mongoose.model('user', userSchema);