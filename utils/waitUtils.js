// utils/waitUtils.js
async function waitForElement(selector, timeout = 10000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
}

module.exports = { waitForElement };
