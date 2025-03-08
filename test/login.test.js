const { expect } = require('chai');
const LoginPage = require('../page/loginPage');
const { handleTestFailure } = require('../helper/helper');

beforeEach(async function () {
  loginPage = new LoginPage();
  await loginPage.open();
});

afterEach(async function () {
  await handleTestFailure.call(this, this.currentTest, loginPage.driver);
  await loginPage.close();
});

describe('Login Positive Cases', function () {

  it('Successfully login as an Admin', async function () {
    await loginPage.enterUsername('user1@gmail.com');
    await loginPage.enterPassword('password');
    await loginPage.clickLogin();

    const currentUrl = await loginPage.driver.getCurrentUrl();
    expect(currentUrl).to.contains('/admin/')
  });

  it('Successfully login as an Agent', async function () {
    await loginPage.enterUsername('user3@gmail.com');
    await loginPage.enterPassword('password');
    await loginPage.clickLogin();

    const currentUrl = await loginPage.driver.getCurrentUrl();
    expect(currentUrl).to.contains('/agent/')
  });

  it('Successfully login as a Supervisor', async function () {
    await loginPage.enterUsername('user4@gmail.com');
    await loginPage.enterPassword('password');
    await loginPage.clickLogin();

    const currentUrl = await loginPage.driver.getCurrentUrl();
    expect(currentUrl).to.contains('/spv/')
  });
});

describe('Login Negative Cases', function () {

  it('Attempt to login without entering an email', async function () {
    await loginPage.enterUsername('admin@example.com');
    await loginPage.clickLogin();

    const alertText = await loginPage.validateAlertMessage();
    expect(alertText).to.equal('Kata Sandi harus diisi.');    
  });

  it('Attempt to login without entering a password', async function () {
    await loginPage.enterPassword('password');
    await loginPage.clickLogin();

    const alertText = await loginPage.validateAlertMessage();
    expect(alertText).to.equal('Email harus diisi.');    
  });

});

describe('Expected Login Failures', function () {

  it('Attempt to login without entering both email and password', async function () {
    await loginPage.enterUsername('');
    await loginPage.enterPassword('');
    await loginPage.clickLogin();

    const alertText = await loginPage.validateAlertMessage();
    expect(alertText).to.equal('x');    
  });
});


