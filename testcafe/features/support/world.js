var { defineSupportCode } = require('cucumber');
const testControllerHolder = require('./testControllerHolder');

console.log("In world.js!");

function CustomWorld () {
    console.log("Waiting for testControllerHolder.get!");
    this.waitForTestController = testControllerHolder.get;
}

defineSupportCode(function ({ setWorldConstructor }) {
    console.log("Setting world constructor!");
    setWorldConstructor(CustomWorld)
});