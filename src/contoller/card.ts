import "../config"
import { RequestHandler } from "express"
import { element2png } from "../service"
import { BusinessCard } from "../react/components"
import { v4 as uuidV4 } from "uuid"
import path from "path"
import fs from "fs"

const __tmpdir = path.resolve(__dirname, "../_tmp")

const getQueryKeys = ["name", "email", "phone", "part", "role"] as const;

const getController: RequestHandler<{}, GetResponse, undefined, GetQuery> = async (req, res) => {
    const {email, name, part, phone, role} = req.query
    for (const queryKey of getQueryKeys) {
        if (!req.query[queryKey]) return res.status(400).send(`${queryKey} is undefined`)
    }

    const CardFront = BusinessCard({name, email, phone, part, role, side: "front"})
    const CardBack = BusinessCard({name, email, phone, part, role, side: "back"})
    const frontBuffer = await element2png(CardFront)
    const backBuffer = await element2png(CardBack)
    
    if (!frontBuffer || !backBuffer) return res.status(500).send("can't generate image")

    const tmp_front_img = `${uuidV4()}.png`
    const tmp_back_img = `${uuidV4()}.png`

    const tmp_front_filepath = path.resolve(__tmpdir, tmp_front_img)
    const tmp_back_filepath = path.resolve(__tmpdir, tmp_back_img)
    fs.writeFileSync(tmp_front_filepath, frontBuffer)
    fs.writeFileSync(tmp_back_filepath, backBuffer)

    res.json({
        front: `${process.env.SERVER_ENDPOINT}:${process.env.PORT}/file?name=${tmp_front_img}`,
        back: `${process.env.SERVER_ENDPOINT}:${process.env.PORT}/file?name=${tmp_back_img}`,
    })
}

export const cardController = {
    get: getController,
}

type GetQuery = Record<typeof getQueryKeys[number], string>
type GetResponse = string | {
    front: string
    back: string
}