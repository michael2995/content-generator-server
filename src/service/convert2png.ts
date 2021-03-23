import {browser} from "../module"
import {v4 as uuidV4} from "uuid"
import path from "path"

export async function convertToPng(html: string) {    
    const page = await browser.newPage()
    console.log(html)

    await page.setContent(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div id="target" style="width: fit-content; height: fit-content;">
                ${html}
            </div>
        </body>
        </html>
    `)

    const target = await page.$("#target")
    const id = uuidV4()
    const filePath = path.resolve(__dirname, `${id}.png`)
    const buffer = await target?.screenshot({path: filePath})
    // await page.close()
    return {
        buffer,
        filePath,
    }
}