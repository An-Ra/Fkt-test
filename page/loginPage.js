const { By } = require('selenium-webdriver');
const BasePage = require('./basePage');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.usernameField = By.css('[name=email]');
    this.passwordField = By.css('[name=password]');
    this.loginButton = By.css('[type=submit]');
    this.alertLoginPage = By.css('.card-body > [role="alert"]')
  }

  async enterUsername(username) {
    const usernameInput = await this.findElement(this.usernameField);
    await usernameInput.sendKeys(username);
  }

  async enterPassword(password) {
    const passwordInput = await this.findElement(this.passwordField);
    await passwordInput.sendKeys(password);
  }

  async clickLogin() {
    const loginBtn = await this.findElement(this.loginButton);
    await loginBtn.click();
    await this.driver.sleep(1000);
  }

  async validateAlertMessage() {
    const alertElement = await this.waitForElement(this.alertLoginPage);
    return await alertElement.getText();
}
}

module.exports = LoginPage;
