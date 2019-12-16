const { expect } = require('chai');
const {
    generateRandomString,
    encryptPassword,
    comparePassword,
    createToken,
} = require('../controllers/helpers');

describe('helpers', function() {
    it('generateRandomString', function() {
        expect(generateRandomString().length).to.equal(16);
    });

    it('encryptPassword', function() {
        encryptPassword('123456', (error, hash) => {
            expect(hash).to.be.a('string');
        })
    });

    it('comparePassword', function() {
        comparePassword('1234', '5678', (error, isMatched) => {
            expect(isMatched).to.be.a('boolean');
        })
    });

    it('createToken', function() {
        expect(createToken({ id: '12345' })).to.be.a('string');
    })
});