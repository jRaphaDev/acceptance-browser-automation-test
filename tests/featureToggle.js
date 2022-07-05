/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    reload,
    intercept
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Open A/B Testing Application", async function () {
    await goto("localhost:3000");
});

step("Deve apresentar <msg>", async function(msg) {

    await assert.ok(await text(msg).exists());
});

step("Deve receber toggle desligada", async function() {
    await intercept("https://cdn.growthbook.io/api/features/{YOUR_APP_KEY}", require('./mock-ft.json'))
    await reload()        
});