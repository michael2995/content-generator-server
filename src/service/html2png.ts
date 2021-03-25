import {browser} from "../module"

export async function html2png(html: string) {
    const page = await browser.newPage()

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
            <div id="target" style="width: fit-content; height: fit-content;">
                ${html}
            </div>
        </body>
        </html>
    `)
   
    const target = await page.$("#target")

    await page.evaluate(() => {
        let prevEntriesCount = 0;
        const ensureRenderFinished = () => new Promise((resolve) => {
            setTimeout(() => {
                const performanceEntries = window.performance.getEntries()
                if (performanceEntries.length !== prevEntriesCount) {
                    prevEntriesCount = performanceEntries.length
                    resolve(ensureRenderFinished())
                } else {
                    resolve("ok")
                }
            }, 1000)
        })

        return ensureRenderFinished()
    })
    
    if (!target) return null

    const buffer = await target.screenshot({type: "png"})
    
    await page.close()

    return buffer
}