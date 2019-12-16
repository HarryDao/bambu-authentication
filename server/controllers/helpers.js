const Bcrypt = require('bcrypt');
const Jwt = require('jwt-simple');
const { JWT_SECRET } = require('../config');

exports.generateRandomString = () => {
    let string = '';
    for (let i = 0; i < 16; i++) {
        string += Math.floor(Math.random() * 10);
    }
    return string;
}

exports.encryptPassword = (password, cb) => {
    Bcrypt.genSalt(10, (error, salt) => {
        if (error) return cb(error);
        Bcrypt.hash(password, salt, (error, hash) => {
            cb(error, hash);
        });
    });
}

exports.comparePassword = (input, password, cb) => {
    Bcrypt.compare(input, password, (error, isMatched) => {
        cb(error, isMatched)
    });
}

exports.createToken = (user) => {
    return Jwt.encode({
        sub: user.id,
        iat: new Date().getTime()     
    }, JWT_SECRET)
}