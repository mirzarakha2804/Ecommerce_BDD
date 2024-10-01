const { Given, When, Then } = require('@wdio/cucumber-framework');
const ebayNavigation = require('../../page-objects/ebayNavigation');
const ebayFilters = require('../../page-objects/ebayFilters');

Given('I am on the eBay homepage', async () => {
    await ebayNavigation.openHomepage();
});
    
When('I search for a product with {string}', async (product) => {
    await ebayNavigation.searchProduct(product);
});

When('I change the search category to {string}', async (category) => {
    await ebayNavigation.changeCategory(category);
});

When('I click the search button', async () => {
   await ebayNavigation.clickSearchButton();
});

Then('I verify that the page loads completely', async () => {
   await ebayNavigation.verifyPageLoad();
});
