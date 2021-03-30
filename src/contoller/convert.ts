import { RequestHandler } from "express"
import { html2png } from "../service"
import { getTempUrl } from "../service/getTempUrl"
import { saveTemp } from "../service/saveTemp"

const putController: RequestHandler = async(req, res) => {
    const {body} = req
    console.log(body)
    const buffer = await html2png(body)

    if (!buffer) return res.status(400).send("Nothing was convertable")

    const tempUrl = await getTempUrl(buffer, "png")

    if (buffer) {
        res.send(tempUrl)
    }
}

export const convertController = {
    put: putController,
}
