const User = require('../models/user');
const { sendVerifyEmail } = require('../services/email');
const helpers = require('./helpers');
const { APP_URL } = require('../config');

exports.signup = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({
            error: 'Email and password must not be blank'
        });
    }

    User.findOne({ email }, (error, user) => {
        if (error) return next(error);
        if (user) {
            return res.status(422).send({
                error: 'Email already taken'
            });
        }
        const verify = helpers.generateRandomString();
        const verifyUrl = `${APP_URL}/verify?token=${verify}`;

        helpers.encryptPassword(password, (error, hash) => {
            if (error) return next(error);
            
            const newUser = new User({
                email,
                password: hash,
                verify
            });
            
            newUser.save((error) => {
                if (error) return next(error);
                sendVerifyEmail({ email, verifyUrl });
                return res.status(200).send({ verifyUrl });
            });
        });
    });
}

exports.verify = (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        return res.status(422).send({
            error: 'Token is required'
        })
    }
    User.findOne({ verify: token }, (error, user) => {
        if (error) return next(error);
        if (!user) {
            return res.status(401).send({
                error: 'No account is found'
            });
        }
        user.verify = undefined;
        user.save((error) => {
            if (error) return next(error);
            return res.sendStatus(200);
        });
    });
}

exports.signin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({
            error: 'Email and password must not be blank'
        });
    }

    User.findOne({ email }, (error, user) => {
        if (error) return next(error);
        if (!user) {
            return res.status(401).send({ error: 'No account was found' });
        }
        helpers.comparePassword(password, user.password, (error, isMatched) => {
            if (error) return next(error);
            if (!isMatched) return res.status(401).send({
                error: 'Password is incorrect'
            });
            if (user.verify) {
                return res.status(401).send({
                    error: 'Your account is not activated. Please check your inbox for activation email'
                });
            }
            res.status(200).send({
                token: helpers.createToken(user)
            });
        });
    });
}