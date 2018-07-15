var Selector            = require('testcafe').Selector;

var EBayHomePage = {
    testController: null,

    getInstance: function(testController) {
        EBayHomePage.testController = testController;
        return EBayHomePage;
    },

    searchFor: function(searchText) {
        var searchTextField = Selector('input[placeholder="Search for anything"]')
                    .with({ boundTestRun: EBayHomePage.testController });

        var searchButton = Selector('input#gh-btn')
                    .with({ boundTestRun: EBayHomePage.testController });

        return EBayHomePage.testController.selectText(searchTextField)
                                    .pressKey('delete')
                                    .typeText(searchTextField, searchText)
                                    .click(searchButton);
    }

}

module.exports = EBayHomePage;
