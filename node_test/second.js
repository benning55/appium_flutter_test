const wdio = require("webdriverio");
// const assert = require('assert');
const {
    byValueKey,
    byText,
    byType
} = require('appium-flutter-finder');
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

const benning = function () {
    describe('Test2.js', function () {

        before(async function () {
            this.timeout(50000 * 10000);
            driver = await wdio.remote(opts);

            buttonFinder = byValueKey('increment');
            countText = byValueKey('counter');
        });

        it('Start with 00', async function () {
            this.timeout(5000);
            expect(await driver.getElementText(countText)).to.equal('0');
        });

        // it('Check Log In text', async function () {
        //   this.timeout(30*1000);
        //   expect(await driver.getElementText(byText('Log in'))).to.equal('Log in');
        // });

        it('Press 2 Time and check is 22', async function () {
            this.timeout(30 * 1000);
            await driver.elementClick(buttonFinder);
            await driver.touchAction({
                action: 'tap',
                element: {
                    elementId: buttonFinder
                }
            });
            for (i = 0; i < 10; i++) {
                await driver.elementClick(buttonFinder);
            }
            expect(await driver.getElementText(countText)).to.equal('12');
        });

        it('Go to next pages and check is corrects', async function () {
            this.timeout(30 * 1000);
            await driver.elementClick(byValueKey('goLogin'));
            // await driver.execute('flutter:waitFor', byValueKey('loginWord'));
            expect(await driver.getElementText(byValueKey('loginWord'))).to.equal('Login Pages');
        });

        it('Enter username and passwords', async function () {
            this.timeout(300 * 1000);
            await driver.elementSendKeys(byValueKey('emailTxt'), 'test35@gmail.com');
            await driver.elementSendKeys(byValueKey('passTxt'), '12345678');
            await driver.elementClick(byValueKey('loginBtn'));
            // await driver.execute('flutter:waitFor', byValueKey('firstText'));
            // expect(await driver.getElementText(byValueKey('firstText'))).to.equal('You have pushed the button this many times:')
        });

        it('Check the main pages', async function () {
            expect(await driver.getElementText(byValueKey('textCheck'))).to.equal('You have pushed the button this many times:');
        });

        after(function () {
            driver.deleteSession();
        })

    });
}

module.exports = {
    benning
}