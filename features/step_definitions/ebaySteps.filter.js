const { Given, When, Then } = require('@wdio/cucumber-framework');
const ebayNavigation = require('../../page-objects/ebayNavigation');
const ebayFilters = require('../../page-objects/ebayFilters');

Given('I am on the eBay homepage', async () => {
    await ebayNavigation.openHomepage();
});

When('I navigate to "Electronics" > "Cell Phones & accessories"', async () => {
    await ebayNavigation.navigateToCellPhones();
});

When('I click on "Cell Phones & Smartphones" in the left navigation', async () => {
    await ebayNavigation.clickCellPhonesAndSmartphones();
});

When('I click on "All Filters"', async () => {
    await ebayFilters.clickAllFilters();
});

When('I add filters for Condition, Price, and Item Location', async () => {
    await ebayFilters.addFilters();
});

Then('I verify the applied filters', async () => {
    await ebayFilters.verifyFilters(3);
});