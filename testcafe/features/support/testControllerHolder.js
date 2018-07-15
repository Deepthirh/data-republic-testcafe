var testControllerHolder = {
    testController: null,

    captureResolver: null,
    getResolver:     null,

    capture: function (t) {
        testControllerHolder.testController = t;

        if (testControllerHolder.getResolver)
            testControllerHolder.getResolver(t);

        console.log("In capture()!" + t);

        return new Promise(function (resolve) {
            testControllerHolder.captureResolver = resolve;
        });
    },

    free: function () {
        testControllerHolder.testController = null;

        if (testControllerHolder.captureResolver)
            testControllerHolder.captureResolver();
    },

    get: function () {
        return new Promise(function (resolve) {
            if (testControllerHolder.testController)
                resolve(testControllerHolder.testController);
            else
                testControllerHolder.getResolver = resolve;
            console.log("In Promise()!" + resolve);
        });
    }
};

module.exports = testControllerHolder;
