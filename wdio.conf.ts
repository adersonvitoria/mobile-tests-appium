import path from 'path';
import type { Options } from '@wdio/types';

export const config: Options.Testrunner = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    port: 4723,

    specs: ['./tests/specs/**/*.spec.ts'],
    exclude: [],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': process.env.DEVICE_NAME || 'emulator-5554',
        'appium:automationName': 'UiAutomator2',
        'appium:app': path.resolve(process.env.APP_PATH || './apps/wdio-demo-app.apk'),
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 240,
        'appium:noReset': false,
        'appium:fullReset': false,
        maxInstances: 1,
    }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: [
        ['appium', {
            args: {
                relaxedSecurity: true,
            },
        }],
    ],

    framework: 'mocha',

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

    afterTest: async function (_test, _context, { error }) {
        if (error) {
            await browser.takeScreenshot();
        }
    },
};
