import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";

@Injectable()
export class BrowserService {
    private browser: Promise<puppeteer.Browser>
    constructor() {
        this.browser = puppeteer.launch({
            headless: true
        })
    }

    async getBrowser() {
        return await this.browser
    }
}