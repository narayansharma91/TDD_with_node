const { assert } = require('chai');
describe('User Registration', function() {// This suite case (collection of test cases.)
    it('Email id should be email', function() {//this is test case.
        const response = validateEmailId('demo@gmail.com');
        assert.equal(true, response);
    })
    it('Email id should not be string', function() {//this is test case.
        const response = validateEmailId('hello');
        assert.notEqual(true, response);
    })
})
const validateEmailId = (email) => {//let's consider this is productio code (from somewhere controller)
    var mailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(mailRegx) ? true : false;
}