var Selector            = require('testcafe').Selector;

var ItemPage = {
    testController: null,
    itemText: null,

    getInstance: function(testController) {
        ItemPage.testController = testController;
        return ItemPage;
    },

    addToCart: function() {
        var itemTextElement = Selector('h1#itemTitle')
                    .with({ boundTestRun: ItemPage.testController });

        var addOnOverlay = Selector('div.adndesc.addon-overlay-body', {
                        visibilityCheck: true
                    })
                    .with({ boundTestRun: ItemPage.testController });

        var addToCart = Selector('a#isCartBtn_btn')
                    .with({ boundTestRun: ItemPage.testController });

        ItemPage.itemText = ItemPage.testController.selectText(itemTextElement).value;

        var action = ItemPage.testController.click(addToCart);

        if (addOnOverlay.visible) {
            var noThanksButtons = Selector('div.adndesc:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > button:nth-child(1)')
                        .with({ boundTestRun: ItemPage.testController });
            action.click(noThanksButtons);
        }

        return action;
    },

    getItemText: function() {
        console.log(ItemPage.itemText);
        return ItemPage.itemText;
    }

}

module.exports = ItemPage;
