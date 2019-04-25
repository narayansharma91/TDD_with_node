# TDD Session 2
In this session, we are going to discuss few things at beginner level like why we need to write UNIT Test? How to configure/write unit test with popular testing framework along with the introduction of TDD.



### Focus Points
- Introduction, Benefits of writing unit test case on your project.
- Configure suitable testing framework for your NODEJS project.
- Example of **UNIT TESTING**
- More about assertions. 

<hr/>

### Introduction of TDD, Unit Test and benifits of unit Test.

**TDD** : **T**est **D**riven **D**evelopment is an innovative software development approach/process where tests are written, before writing the minimum of code required for the test to be fulfilled. 

**UNIT TESTING** : Unit Testing is a level of software testing where individual units/components of a software are tested through testing framework.

#### Benifits of Unit Testing
- Quality of Code
- Finds Software Bugs Early
- Refactor Code
- Provides Documentation
- More confident when you refactor

<hr/>

### Popular Testing Frameworks for nodejs
- **Mocha :** This is the core and very popular framework for nodejs,  browser testing, asynchronous testing, test coverage report and many more. 

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
- Configure package.json file.(Add test command (you can choose as per your choice eg. test-app etc) inside scripts section and set value as "mocha")
```sh
"scripts": {
    "test": "mocha"
  }

```
- Create folder **test** under your project directory

<hr/>

### Practical Example

- Create app.js (or any other name) inside test directory & include chai like below.

```sh
const { assert } = require('chai');
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

- Let's dive into little details using assertions.


```sh
const { assert } = require('chai');
describe('User Registration', function() {// This suite case (collection of test cases.)
    it('Email id should be email format', function() {//this is test case.
        assert.equal(true, true);//just to pass our test case
    })
})
    
```
- Type `npm run test` from your terminal and you will see above test cases has been passed.
- Let's make it more practical and meaningful. 

```sh
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
const validateEmailId = (email) => {//let's consider this is production code (from somewhere controller)
    var mailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(mailRegx) ? true : false;
}

```
- Type `npm run test` from terminal. You will see all test cases will pass.


Have a look into below image how unit test should work on your production code.

![alt text](https://github.com/narayansharma91/node_tdd_sessions/blob/master/Session%202:%20Practical/images/unit_test.png)


<hr/>


### Homework
Add following more functionalities/capabilities to existing query builder on **example3.js**
- Should able to add **join** (left, right, cross etc).
- Should able to add **limit**.
- Should able to add **group by**.
- Should able to add **or** and **and** conditions.
