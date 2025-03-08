const { Builder, until } = require('selenium-webdriver');
const config = require('../config');

class BasePage {
  constructor() {
    this.driver = new Builder().forBrowser(config.browser).build();
  }

  async open() {
    await this.driver.get(config.baseUrl);
  }

  async waitForElement(locator, timeout = 10000) {
    return await this.driver.wait(until.elementLocated(locator), timeout);
  }

  async findElement(locator) {
    return await this.driver.findElement(locator);
  }

  async close() {
    await this.driver.quit();
  }
}

module.exports = BasePage;
