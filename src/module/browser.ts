import puppeteer from "puppeteer"
export let browser: puppeteer.Browser

(async() => {
    browser = await puppeteer.launch({
        headless: true,
    })
})()
