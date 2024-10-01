Feature: eBay Shop

  Scenario: Apply filters on Cell Phones & Smartphones
    Given I am on the eBay homepage
    When I navigate to "Electronics" > "Cell Phones & accessories"
    And I click on "Cell Phones & Smartphones" in the left navigation
    And I click on "All Filters"
    And I add filters for Condition, Price, and Item Location
    Then I verify the applied filters

  Scenario: Access a Product via Search
    Given I am on the eBay homepage
    When I search for a product with "MacBook"
    And I change the search category to "Computers/Tablets & Networking"
    And I click the search button
    Then I verify that the page loads completely
    And I verify that the first result name matches "MacBook"