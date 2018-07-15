var { defineSupportCode } = require('cucumber');
const fs                   = require('fs');
const createTestCafe       = require('testcafe');
const testControllerHolder = require('../support/testControllerHolder');

var testcafe = null;
var DELAY    = 3000;

function createTestFile () {
    console.log("Creating test.js!");
    fs.writeFileSync('test.js',
        'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +

        'fixture("fixture")\n' +

        'test("test", testControllerHolder.capture);');
}

function runTest () {
    var runner = null;
    console.log("Create testCafe!");

    createTestCafe('localhost', 1337, 1338)
        .then(function (tc) {
            testcafe = tc;
            runner   = tc.createRunner();

            console.log("Running test.js!");
            return runner
                .src('./test.js')
                .browsers('chrome')
                .run()
                .catch(function (error) {
                    console.log(error);
                });
        })
        .then(function (report) {
            console.log(report);
            testcafe.close();
            fs.unlinkSync('test.js');
        });
}

defineSupportCode(function ({ registerHandler, setDefaultTimeout }) {
    setDefaultTimeout(30*1000);

    registerHandler('BeforeFeatures', function (features, callback) {
        console.log("In BeforeFeatures!");
        createTestFile();
        runTest();

        setTimeout(callback, DELAY);
    });

    registerHandler('AfterFeatures', function (features, callback) {
        testControllerHolder.free();
        testcafe.close();
        fs.unlinkSync('test.js');
        setTimeout(callback, DELAY);
    });
});
