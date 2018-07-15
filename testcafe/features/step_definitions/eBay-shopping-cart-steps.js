var { defineSupportCode } = require('cucumber');
var Selector            = require('testcafe').Selector;
var EBayHomePage        = require('../pages/eBay-home-page');
var SearchResultPage    = require('../pages/search-result-page');
var ItemPage            = require('../pages/item-page');
var ShoppingCartPage    = require('../pages/shopping-cart-page');

console.log("In step definitions!");

defineSupportCode(function ({ Given, When, Then }) {
    var testController = null;
    var itemPage = null;
    var shoppingCartPage = null;

    console.log("Inside step def defineSupportCode()!");

    Given('I go to eBay website', function() {
        return this.waitForTestController()
            .then(function (tc) {
                testController = tc;

                return testController.navigateTo('https://www.ebay.com.au/');
            });
    });

    When('I search for {stringInDoubleQuotes}', function(searchText) {
        var eBayHomePage = EBayHomePage.getInstance(testController);
        return eBayHomePage.searchFor(searchText);
    });

    When('I select first search result', function() {
        var searchResultPage = SearchResultPage.getInstance(testController);
        return searchResultPage.selectFirstResult();
    });

    Then('It should go to the item page', function() {
        itemPage = ItemPage.getInstance(testController);
    });

    When('I click on {stringInDoubleQuotes}', function(action) {
        if (action === 'Add to cart') {
            return itemPage.addToCart();
        } else if (action === 'Continue Shopping') {
            return shoppingCartPage.continueShopping();
        }
    });

    Then('The item should be added to the shopping cart', function() {
        shoppingCartPage = ShoppingCartPage.getInstance(testController);
    });

    Then('I verify that the shopping cart shows {stringInDoubleQuotes} items', function(numberOfItems) {
        shoppingCartPage.containsProduct(itemPage.getItemText);
        return shoppingCartPage.hasItems(parseInt(numberOfItems.trim()));
    });
});