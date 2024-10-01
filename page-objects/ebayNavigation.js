const assert = require('assert');
class eBayNavigation {
    async openHomepage() {
        await browser.url('https://www.ebay.com');
        await browser.pause(2000);
    }

    async navigateToCellPhones() {
        const shopByCategoryButton = await $('#gh-shop-a');
        await shopByCategoryButton.click();
        await browser.pause(2000);
        
        const ariaExpanded = await shopByCategoryButton.getAttribute('aria-expanded');
        assert.strictEqual(ariaExpanded, 'true');  
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
        await cellPhonesAndSmartphonesLink.waitForDisplayed();
        await cellPhonesAndSmartphonesLink.scrollIntoView(); 
        await cellPhonesAndSmartphonesLink.click(); 
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
        const searchInput = await $('input[name="_nkw"]');
        await searchInput.clearValue(); 
        await searchInput.setValue(product);
        await browser.keys('Enter');
        await browser.pause(2000);
    }

    async changeCategory(category) {
        const dropdown = await $('select[aria-label="Select a category for search"]');
        await dropdown.click();
        await browser.pause(2000);
        const categoryOption = await $(`option=${"└ "+category}`);
        await categoryOption.click();
    }
    async clickSearchButton() {
        const searchButton = await $('input[type="submit"]');
        await searchButton.click();
        await browser.pause(2000);
    } 
    async verifyPageLoad() {
        const saveNullSearchDiv = await browser.$('.srp-save-null-search'); 
        const exists = await saveNullSearchDiv.isExisting(); 
        if (exists) {
            throw new Error('The srp-save-null-search div exists when it should not.'); 
        }
    }


}

module.exports = new eBayNavigation();
