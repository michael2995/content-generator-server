import { RequestHandler } from "express"
import { html2png } from "../service"

const putController: RequestHandler = async(req, res) => {
    const {body} = req
    const buffer = await html2png(body)
    if (buffer) {
        res.send(buffer)
    }
}

export const convertController = {
    put: putController,
}
