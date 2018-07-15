var Selector            = require('testcafe').Selector;

var ShoppingCartPage = {
    testController: null,

    getInstance: function(testController) {
        ShoppingCartPage.testController = testController;
        return ShoppingCartPage;
    },

    containsProduct: function(itemText) {
        var itemTextElement = Selector('a')
                    .withText(itemText)
                    .with({ boundTestRun: ShoppingCartPage.testController });

        if(!ShoppingCartPage.testController.visible(itemTextElement)) {
            throw itemText + " is not present in the shopping cart!";
        }
    },

    hasItems: function(numberOfItems) {
        var cartSummaryTable = Selector('table.cartSummaryTable')
                    .with({ boundTestRun: ShoppingCartPage.testController });
        var summaryText = ShoppingCartPage.testController.getText(cartSummaryTable);

        var text = "Subtotal (" + numberOfItems + " item)";
        if (numberOfItems > 1) {
            text = "Subtotal (" + numberOfItems + " items)";
        }
        var contains = summaryText.contains(text);

        if (!contains) {
            throw "The item does not seem to be added in the cart!";
        }
    },

    continueShopping: function() {
        var continueShopping = Selector('a#contShoppingBtn')
                    .with({ boundTestRun: ShoppingCartPage.testController });
        ShoppingCartPage.testController.click(continueShopping);
    }
}

module.exports = ShoppingCartPage;
