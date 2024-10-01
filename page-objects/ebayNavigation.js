const assert = require('assert');
class eBayNavigation {
    async openHomepage() {
        await browser.url('https://www.ebay.com');
        await browser.pause(2000); // Wait for page to load
    }

    async navigateToCellPhones() {
        const shopByCategoryButton = await $('#gh-shop-a');
        await shopByCategoryButton.click();
        await browser.pause(2000);
        
        const ariaExpanded = await shopByCategoryButton.getAttribute('aria-expanded');
        assert.strictEqual(ariaExpanded, 'true');  // After clicking, aria-expanded should be "true"
        
        const cellPhonesAndAccessoriesLink = await $('a.scnd=Cell phones & accessories');
        await cellPhonesAndAccessoriesLink.click();
        await browser.pause(2000);
        
        const titleSpan = await $('span=Cell Phones & Accessories');
        const titleText = await titleSpan.getText();
        assert.strictEqual(titleText, 'Cell Phones & Accessories');
        await browser.pause(2000);
    }

    async clickCellPhonesAndSmartphones() {
        const cellPhonesAndSmartphonesLink = await $('a=Cell Phones & Smartphones');
        await cellPhonesAndSmartphonesLink.waitForDisplayed(); // Wait for the link to be displayed
        await cellPhonesAndSmartphonesLink.scrollIntoView(); // Scroll to the element if necessary
        await cellPhonesAndSmartphonesLink.click(); // Click the link
        await browser.pause(2000);

        const titleSpan = await $('span=Cell Phones & Smartphones');
        const titleText = await titleSpan.getText();
        assert.strictEqual(titleText, 'Cell Phones & Smartphones');
        await browser.pause(2000);
    }
    async verifyFilters() {
        const appliedFiltersListItems = await $$('li.brm__item.brm__item--applied'); 
        assert.strictEqual(appliedFiltersListItems.length, expectedCount, `Expected ${expectedCount} filters to be applied.`);

        await browser.pause(2000);
    }
    async searchProduct(product) {
        const searchInput = await $('input[name="_nkw"]'); ; // Search input field
        await searchInput.clearValue(); // Clear any existing text
        await searchInput.setValue(product); // Enter the product name
        await browser.keys('Enter');
        await browser.pause(2000);
    }

    async changeCategory(category) {
        const dropdown = await $('select[aria-label="Select a category for search"]');
        
        await dropdown.click();

        await browser.pause(2000);
        const categoryOption = await $(`option=${"└ "+category}`);
        await categoryOption.click();
        // const searchInput = await $('input[name="_nkw"]'); ;
        // searchInput.click();
        // await browser.keys('Enter');
        // await browser.pause(2000);

        
    }
    async clickSearchButton() {
        const searchButton = await $('input[type="submit"]');
        await searchButton.click();
        await browser.pause(2000);
    } 
    async verifyPageLoad() {
        const saveNullSearchDiv = await browser.$('.srp-save-null-search'); // Selector for the div
        const exists = await saveNullSearchDiv.isExisting(); // Check if the element exists
        if (exists) {
            throw new Error('The srp-save-null-search div exists when it should not.'); // Throw an error if it exists
        }
    }


}

module.exports = new eBayNavigation();
