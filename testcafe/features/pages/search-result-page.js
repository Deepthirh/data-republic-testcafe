var Selector            = require('testcafe').Selector;

var SearchResultPage = {
    testController: null,

    getInstance: function(testController) {
        SearchResultPage.testController = testController;
        return SearchResultPage;
    },

    selectFirstResult: function() {
        var brandNew = Selector('input[aria-label="Brand New"]')
                    .with({ boundTestRun: SearchResultPage.testController });

        var firstResult = Selector('#srp-river-results-listing1>div:nth-child(1)>div:nth-child(1)')
                    .with({ boundTestRun: SearchResultPage.testController });

        return SearchResultPage.testController.click(brandNew)
                                              .click(Selector('#srp-river-results-listing1>div:nth-child(1)>div:nth-child(1)')
                                                                         .with({ boundTestRun: SearchResultPage.testController }));
    }

}

module.exports = SearchResultPage;
