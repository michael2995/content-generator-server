import {browser} from "../module"

export function html2png(html: string): Promise<string | Buffer | void> {
    return new Promise(async (resolve, reject) => {
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