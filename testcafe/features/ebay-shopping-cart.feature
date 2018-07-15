Feature: eBay, add to shopping cart

Scenario: Search 2 different products from eBay, add them to cart and verify that the cart contains the two selected products
    Given I go to eBay website
    And I search for "macbook pro"
    When I select first search result
    Then It should go to the item page
    When I click on "Add to cart"
    Then The item should be added to the shopping cart
    And I verify that the shopping cart shows "1" items
    And I click on "Continue Shopping"
    When I search for "google pixel 2 xl"
    And I select first search result
    Then It should go to the item page
    When I click on "Add to cart"
    Then The item should be added to the shopping cart
    And I verify that the shopping cart shows "2" items
