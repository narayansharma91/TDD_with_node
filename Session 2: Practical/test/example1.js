const { assert } = require('chai');
describe('Test foo', function() {
   var response_from_function_a = 'hi';
   it('should pass test cases', function() {
       assert.equal('hi', response_from_function_a);
   })
})
