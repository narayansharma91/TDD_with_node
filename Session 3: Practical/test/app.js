const {
    describe,
    it
} = require('mocha');

var assert = require('assert');
const {
    sequelize,
    User
} = require('./../models/index');
before(async () => {
    await sequelize.drop();
    await sequelize.sync({
        force: true
    });
})

describe('Test Suites', async () => {
    it('first Test cases', () => {
      //your test case will goes here
    })
})