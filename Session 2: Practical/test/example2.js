const { assert } = require('chai');
const app = require('./../app');

describe('Example 2', function() {
    it('should sum value', function() {
        assert.equal(app.sum(2, 4), 6);
    })
 })
 