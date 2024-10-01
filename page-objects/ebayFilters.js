const assert = require('assert');
class eBayFilters {
    async clickAllFilters() {
        const allFiltersButton = await $('button[aria-label="All Filters"]');
        
        await allFiltersButton.waitForDisplayed();
        await allFiltersButton.scrollIntoView();
        await allFiltersButton.waitForClickable();
        await allFiltersButton.click();
        
        await browser.pause(2000);

        const popup = await $('div[role="document"].dialog__window'); 
        await popup.waitForDisplayed();
        
        assert.strictEqual(await popup.isDisplayed(), true); // Adjust according to your assertion library
        
        const closeButton = await popup.$('button.dialog__close');
        assert.strictEqual(await closeButton.isDisplayed(), true); // Assert the close button is visible
        await browser.pause(2000);
    }

    async addFilters() {
        const itemCondition = {
            title: 'Condition',
            dataAspectTitle: 'LH_ItemCondition'
        };
        const conditionTab = await $(`div[data-aspecttitle="${itemCondition.dataAspectTitle}"]`);
        await conditionTab.waitForDisplayed();
        await conditionTab.click();
        await browser.pause(2000);
        
        // Locate the label for the "New" condition checkbox
        const newConditionLabel = await $('label[for="c3-subPanel-LH_ItemCondition_New_cbx"]');
        await newConditionLabel.waitForDisplayed();
        await newConditionLabel.scrollIntoView();
        await newConditionLabel.waitForClickable();
        await newConditionLabel.click();
        await browser.pause(2000);

        const priceRange = {
            title: 'Price',
            dataAspectTitle: 'price'
        };
        const priceTab = await $(`div[data-aspecttitle="${priceRange.dataAspectTitle}"]`);
        await priceTab.waitForDisplayed();
        await priceTab.click();
        await browser.pause(2000);
        
        // Select the price range
        const minPriceInput = await $('input.x-textrange__input--from');
        const maxPriceInput = await $('input.x-textrange__input--to');
        await minPriceInput.setValue('456800');  // Set your minimum price here
        await maxPriceInput.setValue('654200');  // Set your maximum price here
        await browser.pause(2000); 

        const itemLocation = {
            title: 'Item Location',
            dataAspectTitle: 'location'
        };
        const locationTab = await $(`div[data-aspecttitle="${itemLocation.dataAspectTitle}"]`);
        await locationTab.waitForDisplayed({ timeout: 20000 });
        await locationTab.click();
        await browser.pause(2000);
        
        const locationFieldset = await $('fieldset.x-overlay-sub-panel__aspect-fieldset'); 
        await locationFieldset.waitForDisplayed({ timeout: 20000 });
        const asiaLocationOption = await locationFieldset.$('input[type="radio"][value="Asia"][name="location"]');
        await asiaLocationOption.click();
        const isChecked = await asiaLocationOption.isSelected();
        console.log('Asia radio button is checked:', isChecked);
        await browser.pause(2000);

        const applyButton = await $('button[aria-label="Apply"]');
        await applyButton.click();
        await browser.pause(2000);
    }
    async getAppliedFilterTexts() {
        // Wait for the filter list to be visible
        const filterList = await $('.brm__aspect-list');
        await filterList.waitForDisplayed();

        // Get all applied filter items
        const appliedFiltersListItems = await $$('.brm__aspect-item.brm__aspect-item--applied');

        // Initialize an array to hold the texts
        const filterTexts = [];

        // Loop through each applied filter item and extract the relevant texts
        for (const filterItem of appliedFiltersListItems) {
            const filterText = await filterItem.$('.brm__item-label').getText();
            filterTexts.push(filterText.trim());
        }

        return filterTexts;
    }

    async verifyFilters(expectedCount) {
        const filterButton = await $('button.x-flyout__button');
        await filterButton.scrollIntoView();
        await filterButton.click(); 
        await browser.pause(2000); // Allow time for filters to be displayed

        // Get applied filter texts
        const appliedFilters = await this.getAppliedFilterTexts();

        // Verify the count of applied filters
        assert.strictEqual(appliedFilters.length, expectedCount, `Expected ${expectedCount} filters, but found ${appliedFilters.length}.`);

        // Define the expected filters
        const expectedFilters = [
            "Condition: New", 
            "Price: $456,800.00 to $654,200.00", 
            "Item Location: Asia"
        ];

        for (let i = 0; i < expectedFilters.length; i++) {
            const appliedFilter = appliedFilters[i];
    
            // Extract the relevant filter text (remove ' filter applied' if it exists)
            const cleanedAppliedFilter = appliedFilter.replace(' filter applied', '').trim();
    
            // Log the comparison
            console.log(`Checking if applied filter: "${cleanedAppliedFilter}" includes expected filter: "${expectedFilters[i]}"`);
    
            // Check if the cleaned applied filter includes the expected filter
            if (!cleanedAppliedFilter.includes(expectedFilters[i])) {
                throw new Error(`Expected applied filter to include "${expectedFilters[i]}" at index ${i}, but found "${cleanedAppliedFilter}".`);
            }
        }
    

        await browser.pause(2000); // Additional pause if needed
    }
}

module.exports = new eBayFilters();
