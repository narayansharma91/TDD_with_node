const {
    assert
} = require('chai');
describe('User Registration', () => {
    it('Email id should be email', () => {
        const response = validateEmailId('demo@gmail.com');
        assert.equal(true, response);
    })
    it('Email id should not be string', () => {
        const response = validateEmailId('hello');
        assert.notEqual(true, response);
    })
})

const validateEmailId = (email) => {
    var mailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(mailRegx) ? true : false;
}

