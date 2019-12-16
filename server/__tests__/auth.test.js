const sinon = require('sinon');
const { expect } = require('chai');
const { signup, signin, verify } = require('../controllers/auth');
const User = require('../models/user');
const helpers = require('../controllers/helpers');

describe('auth controller', function() {
    let resCollection = {};
    let nextCollection = [];
    let req = {};
    let res = {
        code: 0,
        status: function(code) {
            this.code = code;
            return this;
        },
        send: function(message) {
            resCollection[this.code] = message;
        },
        sendStatus: function(code) {
            resCollection[code] = 'ok';
        }
    };
    let next = function(message) {
        nextCollection.push(message);
    }

    beforeEach(function() {
        resCollection = {};
        nextCollection = [];
    });

    afterEach(function() {
        sinon.restore();
    });

    describe('signup', function() {
        it('return 422 if email or password is blank', function() {
            req = {
                body: {
                    email: ''
                }
            }
            signup(req, res, next);

            expect(resCollection).to.deep.equal({
                '422': {
                    error: 'Email and password must not be blank'
                }
            });
        });

        describe('with valid email and password', function() {
            let findOne;
            beforeEach(function() {
                req = {
                    body: {
                        email: 'a@a.com',
                        password: 'password',
                    }
                }
                findOne = sinon.stub(User, 'findOne');
            });

            it('return error if error', function() {
                findOne.callsFake(function(opt, cb) {
                    return cb('11');
                });
                signup(req, res, next);

                expect(nextCollection).to.deep.equal(['11']);
            });

            it('return 422 if email is taken', function() {
                findOne.callsFake(function(opt, cb) {
                    return cb(null, true);
                });
                signup(req, res, next);
                expect(resCollection).to.deep.equal({
                    '422': {
                        error: 'Email already taken'
                    }
                });
            });
        })
    });

    describe('verify', function() {
        it('return error if no token', function() {
            req = {
                body: {}
            };
            verify(req, res, next);
            expect(resCollection).to.deep.equal({
                '422': {
                    error: 'Token is required'
                }
            })
        });

        describe('with token', function() {
            let findOne;
            beforeEach(function() {
                req = {
                    body: {
                        token: '1234'
                    }
                };
                findOne = sinon.stub(User, 'findOne');
            });

            it('return error if error during find user', function() {
                findOne.callsFake(function(opt, cb) {
                    return cb('11');
                });
                verify(req, res, next);
                expect(nextCollection).to.deep.equal(['11']);
            });

            it('return error if no account', function() {
                findOne.callsFake(function(opt, cb) {
                    return cb(null, false);
                });
                verify(req, res, next);
                expect(resCollection).to.deep.equal({
                    '401': {
                        error: 'No account is found'
                    }
                })
            });

            it('return error if error when save', function() {
                let save = sinon.stub();
                findOne.callsFake(function(opt, cb) {
                    cb(null, { save });
                });
                save.callsFake(function(cb) { return cb(true) });
                verify(req, res, next);
                expect(nextCollection).to.deep.equal([true]);
            });

            it('return 200', function() {
                let save = sinon.stub();
                findOne.callsFake(function(opt, cb) {
                    cb(null, { save });
                });
                save.callsFake(function(cb) { return cb(false) });
                
                verify(req, res, next);
                expect(resCollection).to.deep.equal({
                    '200': 'ok'
                })
            });
        });
    });

    describe('signin', function() {
        it('return error if no email', function() {
            req = {
                body: {}
            };
            signin(req, res, next);
            expect(resCollection).to.deep.equal({
                '422': {
                    error: 'Email and password must not be blank'
                }
            })
        });

        describe('with email and password', function() {
            let findOne
            beforeEach(function() {
                req = {
                    body: {
                        email: 'a@a.com',
                        password: '123456'
                    }
                }
                findOne = sinon.stub(User, 'findOne')
            });

            it('return error if findOne user', function() {
                findOne.callsFake(function(opts, cb) {
                    cb(true);
                });

                signin(req, res, next);
                expect(nextCollection).to.deep.equal([true]);
            });

            it('return error if no user found', function() {
                findOne.callsFake(function(opts, cb) {
                    return cb(null, false);
                })

                signin(req, res, next);
                expect(resCollection).to.deep.equal({
                    '401': {
                        error: 'No account was found'
                    }
                });
            });

            describe('comparePassword', function() {
                let comparePassword
                beforeEach(function() {
                    findOne.callsFake(function(opts, cb) {
                        return cb(null, { password: '123456' });
                    })
                    comparePassword = sinon.stub(helpers, 'comparePassword');

                });
                it('return error if error', function() {
                    comparePassword.callsFake(function(opt1, opt2, cb) {
                        return cb(true);
                    })
                    signin(req, res, next);
                    expect(nextCollection).to.deep.equal([true]);
                });

                it('return error not matched password', function() {
                    comparePassword.callsFake(function(opt1, opt2, cb) {
                        return cb(null, false);
                    })
                    signin(req, res, next);
                    expect(resCollection).to.deep.equal({
                        '401': {
                            error: 'Password is incorrect'
                        }
                    });
                });
                it('return 401 if not verify', function() {
                    findOne.callsFake(function(opts, cb) {
                        return cb(null, { password: '123456', verify: true });
                    });
                    comparePassword.callsFake(function(opt1, opt2, cb) {
                        return cb(null, true);
                    });
                    signin(req, res, next);
                    expect(resCollection).to.deep.equal({
                        '401': {
                            error: 'Your account is not activated. Please check your inbox for activation email'
                        }
                    })
                })

                it('return 200', function() {
                    comparePassword.callsFake(function(opt1, opt2, cb) {
                        return cb(null, true);
                    });
                    signin(req, res, next);
                    expect(Object.keys(resCollection)).to.deep.equal(['200']);                  
                });
            });
        });
    });
});