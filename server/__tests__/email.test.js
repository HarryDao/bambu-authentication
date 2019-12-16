const sinon = require('sinon');
const { expect } = require('chai');
const Nodemailer = require('nodemailer');
const { sendVerifyEmail } = require('../services/email');

describe('sendVerifyEmail', function() {
    describe('send', function() {
        let options, cb;
        beforeEach(function() {
            options = {};
            cb = sinon.stub();
            const createTransport = sinon.stub(Nodemailer, 'createTransport');
            createTransport.callsFake(function() {
                return {
                    sendMail: cb
                }
            });
        });
        it('send with error', function(){
            cb.callsFake(function(opts, callback) {
                options = opts;
                callback(1);
            });
            sendVerifyEmail({
                email: 'a@a.com',
                verifyUrl: 'http://www.google.com'
            });
            expect(Object.keys(options)).to.deep.equal(['from', 'to', 'subject', 'html']);
        });
    });
});