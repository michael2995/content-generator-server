import { Injectable } from "@nestjs/common"
import chromium from "chrome-aws-lambda"
import fs from "fs"

type Promised<T> = T extends Promise<infer X> ? X : T
@Injectable()
export class BrowserService {
    private browser?: Promised<ReturnType<typeof chromium.puppeteer.launch>>
    constructor() {
        this.init()
    }

    async init() {
        console.log("Launching browser")
        fs.readdirSync("/tmp", {encoding: "utf-8"})
        const executablePath = await chromium.executablePath
        console.log("executablePath is defined as: ", executablePath)

        try {
            const browser = await chromium.puppeteer.launch({
                headless: chromium.headless,
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: executablePath,
                ignoreHTTPSErrors: true,
            })
            if (!browser) console.log("Failed to launch browser")
            if (browser) {
                console.log("Successfully launched browser")
                this.browser = browser
            }
        } catch (e) {
            console.log("Failed to launch browser because of error: ", e)
        }
    }

    async getBrowser() {
        if (!this.browser) return null
        return this.browser
    }
}