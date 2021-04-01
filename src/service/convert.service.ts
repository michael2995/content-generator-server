import { Injectable } from "@nestjs/common";
import { BrowserService } from "./browser.service";
import ReactDomServer from "react-dom/server"

@Injectable()
export class ConvertService {
    constructor(
        private browserService: BrowserService
    ) {}
    element2png = async (element: JSX.Element) => {
        const markup = ReactDomServer.renderToStaticMarkup(element)
        const buffer = await this.html2png(markup)
        return buffer
    }

    html2png = async (html: string): Promise<string | Buffer | void> => {
        return new Promise(async (resolve, reject) => {
            const browser = await this.browserService.getBrowser()
            if (!browser) return reject("Browser is not launched")
            const page = await browser.newPage()
        
            page.on("load", async() => {
                const target = await page.$("#target")
                if (!target) return null
                const buffer = await target.screenshot({type: "png"})
                await page.close()
                resolve(buffer)
            })
    
            await page.setViewport({deviceScaleFactor: 2, height: 1920, width: 1280})
            await page.setContent(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <link href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css" rel="stylesheet" type="text/css">
                </head>
                <body>
                    <div id="target" style="width: fit-content; height: fit-content; padding: 0; margin: 0;">
                        ${html}
                    </div>
                </body>
                </html>
            `)
        })
    }
}