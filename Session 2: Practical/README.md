# TDD Session 2
In this session, we are going to discuss few important things at beginner level including benifits of writing unit test, configure.write unit test with popular testing framework along with the introduction of TDD.


### Focus Points
- Introduction, Benefits of writing unit test on your project.
- Configure suitable testing framework for your NODEJS project.
- Examples of **UNIT TESTING**

<hr/>

### Introduction of TDD, Unit Test

**TDD** : **T**est **D**riven **D**evelopment is an innovative software development approach/process where tests are written, before writing the minimum of code required for the test to be fulfilled. 

**UNIT TESTING** : Unit Testing is a level of software testing where individual units/components of a software are tested through testing framework.

#### Benifits of writing Unit Testing
- Improve quality of code
- Finds software bugs early
- Provides documentation of application
- More confident when you refactor

<hr/>

### Popular Testing Frameworks for nodejs
- **Mocha :** Mocha is very popular and core testing framework for nodejs. This framework provide basic structure, functions and assertion which are required while writing unit test.

<p>&nbsp; &nbsp; Official website: https://mochajs.org/ </p>



<p>&nbsp; &nbsp; Installation: </p>

```sh
npm Install mocha --save-dev //install package as dev dependency or
npm Install mocha --g //install package globally

```

- **Chai :** Chai is BDD/TDD assertions library for nodejs and browser. Its provides natural language assertions with elegant and readable style. 

<p>&nbsp; &nbsp; Official website: https://www.chaijs.com/</p>


<p>&nbsp; &nbsp; Installation: </p>

```sh
npm Install chai --save-dev //install package as dev dependency or
npm Install chai --g //install package globally

```


<hr/>


### Configure Chai and Mocha on nodejs project.
- Configure `package.json` file.(Add **test** command (you can choose as per your choice eg. test-app etc) inside scripts section and set value as **mocha**)
```sh
"scripts": {
    "test": "mocha"
  }

```
- Create folder **test** under your project directory

<hr/>

### Practical Example 1
Write a simple structure for Unit Test

- Create app.js (or any other name) inside test directory & include chai like below.

```sh
const { assert } = require('chai');
const { describe, it } = require('mocha');

```
- Write basic structure like below.
```sh
describe('Test suites title', function() {
    it('test case title', function() {
       
    })
    it('test case title2', function() {
       
    })
})
```
&nbsp; &nbsp; &nbsp; **describe**: Commonly known as test suites, which contains test cases. One suites case can have multiple test cases and multiple suites. 

&nbsp; &nbsp; &nbsp; **it** : This is consider as test case. Normally, its validate the particular unit of code. 


<hr/>

### Practical Example 2

Write two test cases, one should pass and another should not pass.


```sh
const {
    assert
} = require('chai');
const { describe, it } = require('mocha');

describe('Test foo', () => {
    it('should pass test cases', () => {
        assert.equal('hi', returnHi());
    })
    it('should not pass test cases', () => {
        assert.equal('hi', returnHello());
    })
})

function returnHi() {
    return 'hi';
}

function returnHello() {
    return 'hello'
}
    
```
- Type `npm run test` from your terminal and you will see above test cases will failed.


<hr/>

### Practical Example 3

Write a unit test it should validate your sum function that has been defined on external file `app.js`.

**app.js**

```sh

const sum = (value1, value2) => {
    return value1 + value2;
};
module.exports = {
    sum
}

```
**test/app.js**

```sh
const { assert } = require('chai');
const { describe, it } = require('mocha');

const app = require('../app');

describe('Example 3', function() {
    it('should sum value', function() {
        assert.equal(app.sum(2, 4), 6);
    })
 })

```
- Type `npm run test` from terminal. You will see all test cases will pass.


<hr/>

### Practical Example 4
Write a query builder function and test cases to validate following below capabilities of query builder.
1. Generate sql query to **select all the columns** from specific table if columns doesn't defined.
**app.js**

```
const getSqlQuery = (table, columns = []) => {
    const selectColumns = columns.length > 0 ? '' : '*';
    return `select ${selectColumns} from ${table}`;
}
module.exports = {
    getSqlQuery,
}
```
**test/app.js**

```
const { assert } = require('chai');
const { describe, it } = require('mocha');
const { getSqlQuery, trimString } = require('../app');
describe('Sql Query Builder', () => {
    it('should select all columns from specific table if columns not mentioned.', () => {
        assert.equal('select * from users', getSqlQuery('users'));
    })
```

2. Select **specific columns** from specified table name.

**app.js**

```
const getSqlQuery = (table, columns = []) => {
   const selectColumns = columns.length > 0 ? columns.join(', ') : '*';
    return `select ${selectColumns} from ${table}`;
}
module.exports = {
    getSqlQuery,
}
```
**test/app.js**
```
    it('should select columns from specific table', () => {
        assert.equal('select name, id from users', getSqlQuery('users', ['name', 'id']));
    })
```

3. Should able to add single **where condition**.

**app.js**

```
const getSqlQuery = (table, columns = [], where = []) => {
   const selectColumns = columns.length > 0 ? columns.join(', ') : '*';
    const whereConditions = where.length > 0 ? ` where ${Object.keys(where[0])[0]}=${where[0][Object.keys(where[0])]}` : '';
    return `select ${selectColumns} from ${table}${whereConditions}`;
}
```
**test/app.js**
```
     it('should able to add single where conditions', () => {
        assert.equal('select * from users where email=abc@gmail.com', getSqlQuery('users', [], [{
            'email': 'abc@gmail.com'
        }]));
    })
```

4. Should able to manage **multiple where conditions**.

**app.js**

```
const getSqlQuery = (table, columns = [], where = []) => {
    const selectColumns = columns.length > 0 ? columns.join(', ') : '*';
    const whereConditions = where.reduce((acc, data, index) => {
        const key = Object.keys(data)[0];
        const dynamicCondition = `${Object.keys(data)[0]}=${data[key]} `;
        const clause = index == 0 ? ` where ` : ` and `;
        return acc += clause + dynamicCondition;
    }, '');
    return `select ${selectColumns} from ${table}${whereConditions}`;
}
```

**test/app.js**

```
    it('should able to manage multiple where conditions', () => {
        const sql = getSqlQuery('users', [],
            [
                {
                    'email': 'abc@gmail.com',
                },
                {
                    'user_type_id': 1
                }
            ]
        );
        assert.equal('select * from users where email=abc@gmail.com and user_type_id=1', sql);
    })
```

<hr/>


### Homework
Add following more functionalities/capabilities to existing query builder on **example4.js**
- Should able to add **join** (left, right, cross etc).
Acceptance Criteria: If main table is users and you want to join users table with user_types table, Your query should look like below.
```
it('should able to join tables', () => {
        assert.equal('select * from users join user_types on users.user_type_id=user_types.id', getSqlQuery('users', param2, param3);
    })
    
```

- Should able to add **limit**.

Acceptance Criteria: If your table is users you want to fetch only 10 results from users table, your query should look like below.
```
it('should able to join tables', () => {
        assert.equal('select * from users limit 10', getSqlQuery('users', param2, param3);
    })
```

- Should able to **sort data by column**.

Acceptance Criteria: If your table is users you want to order records by user name, your query should look like below.
```
it('should able to join tables', () => {
        assert.equal('select * from users ORDER BY name asc', getSqlQuery('users', param2, param3 etc);
    })
```


