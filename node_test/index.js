const wdio = require("webdriverio");
// const assert = require('assert');
const { byValueKey, byText, byType } = require('appium-flutter-finder');
const expect = require('chai').expect;


const osSpecificOps = {
    platformName: 'Android',
    deviceName: 'emulator-5554',
    // @todo support non-unix style path
    app: 'C:\\Users\\bmais\\Documents\\appium_flutter_test\\myapp\\build\\app\\outputs\\apk\\debug\\app-debug.apk'
    // app: '/home/benntend/Desktop/appium_flutter_test/myapp/build/app/outputs/apk/debug/app-debug.apk',
  }

  
  const opts = {
    path: '/wd/hub/',
    port: 4723,
    capabilities: {
      ...osSpecificOps,
      automationName: 'Flutter'
    }
  };

  describe('Test.js', function () {
    
    before(async function() {
      this.timeout(50000*10000);
      driver = await wdio.remote(opts);

      buttonFinder = byValueKey('increment');
      countText = byValueKey('counter');
    });

    it('Start with 0', async function () {
      this.timeout(5000);
      expect(await driver.getElementText(countText)).to.equal('0');
    });

    // it('Check Log In text', async function () {
    //   this.timeout(30*1000);
    //   expect(await driver.getElementText(byText('Log in'))).to.equal('Log in');
    // });

    it('Press 2 Time and check is 2', async function () {
      this.timeout(30*1000);
      await driver.elementClick(buttonFinder);
      await driver.touchAction({
          action: 'tap',
          element: { elementId: buttonFinder }
      });
      for (i = 0; i < 10; i++){
        await driver.elementClick(buttonFinder);
      }
      expect(await driver.getElementText(countText)).to.equal('12');
    });

    it('Enter Some Text', async function() {
      this.timeout(30*1000);
      expect(await driver.elementSendKeys(byType('TextField'), 'Benning Is Awsomr'))
    });

    it('Go to next pages and check is correct', async function () {
      this.timeout(30*1000);
      await driver.elementClick(byValueKey('goLogin'));
      // await driver.execute('flutter:waitFor', byValueKey('loginWord'));
      expect(await driver.getElementText(byValueKey('loginWord'))).to.equal('Login Pages');
    });

    it('Enter username and password', async function() {
      this.timeout(300*1000);
      // await driver.elementSendKeys(byValueKey('TextField'), 'test35@gmail.com');
      // await driver.elementClick(byType('TextField'));
      // await driver.elementSendKeys(byText('Email'), 'test35@gmail.com');
      // await driver.execute('flutter:enterText', 'I can enter text')
      await driver.elementSendKeys(byValueKey('passTxt'), '12345678');
      await driver.elementClick(byValueKey('loginBtn'));
      // await driver.execute('flutter:waitFor', byValueKey('firstText'));
      // expect(await driver.getElementText(byValueKey('firstText'))).to.equal('You have pushed the button this many times:')
    });

    it('Check the main page', async function() {
      expect(await driver.getElementText(byValueKey('textCheck'))).to.equal('You have pushed the button this many times:');
    });

    after( function() {
      driver.deleteSession();
    })

  });

  let test2 = require('./second');
  test2.benning();

// (async () => {
//     const counterTextFinder = byValueKey('counter');
//     const buttonFinder = byValueKey('increment');

//     const driver = await wdio.remote(opts);

//     // if (process.env.APPIUM_OS == 'android') {
//     //     await driver.switchContext('NATIVE_APP');
//     //     await (await driver.$('~fab')).click();
//     await driver.switchContext('FLUTTER');
//     // } else {
//     //     console.log('Switching context to `NATIVE_APP` is currently only applicable to Android demo app.')
//     // }

//     assert.strictEqual(await driver.getElementText(counterTextFinder), '0');

//     await driver.elementClick(buttonFinder);
//     await driver.touchAction({
//         action: 'tap',
//         element: { elementId: buttonFinder }
//     });
//     await driver.elementClick(buttonFinder);

//     assert.strictEqual(await driver.getElementText(counterTextFinder), '2');
    
//     driver.deleteSession();
// })();