import { RequestHandler } from "express"
import path from "path"
import fs from "fs"


const getController: RequestHandler<undefined, string, undefined, GetQuery> = async(req, res) => {
    const __tmpdir = path.resolve(__dirname, "../_tmp")
    const {name} = req.query
    if (!name) return res.status(404).send("couldn't find file")
    const filepath = path.resolve(__tmpdir, name)
    res.sendFile(filepath, (err) => {
        if (err) throw err
        fs.unlinkSync(filepath)
    })
    
}

export const fileController = {
    get: getController,
}

type GetQuery = {
    name?: string
}