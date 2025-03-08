const fs = require('fs');
const path = require('path');
const addContext = require('mochawesome/addContext');

async function takeScreenshot(driver, test) {
    try {
        const screenshotDir = path.join(__dirname, '../mochawesome-report/screenshots');
        const screenshotName = `${test.uuid.replace(/\s+/g, '_')}.png`;
        const screenshotPath = path.join(screenshotDir, screenshotName);
        const relativePath = `screenshots/${screenshotName}`;
        fs.mkdirSync(screenshotDir, { recursive: true });
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
        console.log(`📸 Screenshot saved: ${screenshotPath}`);
        return `./${relativePath}`;

    } catch (error) {
        console.error('Error taking screenshot:', error);
        return null;
    }
}
async function handleTestFailure(test, driver) {
    if (test.state === 'failed') {
        const screenshotPath = await takeScreenshot(driver, test);
        if (screenshotPath) {
            addContext(this, {
                title: 'Screenshot',
                value: screenshotPath,
            });
        }
    }
}

module.exports = { takeScreenshot, handleTestFailure };
