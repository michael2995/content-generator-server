import { Injectable } from "@nestjs/common"
import chromium from "chrome-aws-lambda"
@Injectable()
export class BrowserService {
    private browser?: ReturnType<typeof chromium.puppeteer.launch>
    private executablePath?: typeof chromium.executablePath
    constructor() {
        this.init()
    }

    async init() {
        console.log("Launching browser")
        this.executablePath = chromium.executablePath

        try {
            const executablePath = await this.executablePath
            console.log("executable path: ", executablePath)
            this.browser = chromium.puppeteer.launch({
                headless: true,
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath,
                ignoreHTTPSErrors: true,
            })

        } catch (e) {
            console.log("Failed to launch browser because of error: ", e)
        }
    }

    async getBrowser() {
        await this.executablePath
        await this.browser
        if (!this.browser) return null
        return this.browser
    }
}