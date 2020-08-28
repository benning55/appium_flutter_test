const wdio = require("webdriverio");
// const assert = require('assert');
const { byValueKey } = require('appium-flutter-finder');
const expect = require('chai').expect;


const osSpecificOps = process.env.APPIUM_OS === 'android' ? {
    platformName: 'Android',
    deviceName: '4b283c1f9905',
    // @todo support non-unix style path
    app: '/home/benntend/Desktop/appium_flutter_test/myapp/build/app/outputs/apk/debug/app-debug.apk',
  }: process.env.APPIUM_OS === 'ios' ? {
    platformName: 'iOS',
    platformVersion: '12.2',
    deviceName: 'iPhone X',
    noReset: true,
    app: __dirname +  '/../apps/Runner.zip',
  
  } : {};

  
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

    it('Go to next pages and check is correct', async function () {
      this.timeout(30*1000);
      await driver.elementClick(byValueKey('goLogin'));
      await driver.execute('flutter:waitFor', byValueKey('loginWord'));
      expect(await driver.getElementText(byValueKey('loginWord'))).to.equal('Login Pages');
    });

    after( function() {
      driver.deleteSession();
    })

  });

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