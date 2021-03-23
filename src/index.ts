import express from "express"
import {convertToPng} from "./service"
import fs from "fs"

const PORT = process.env.PORT || 4321
const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json({}))
app.use(express.text())

app.get("/", (req, res) => {
    res.send("ok")
})

app.put("/convert", async (req, res) => {
    const {body} = req
    console.log(body)
    const {buffer, filePath} = await convertToPng(body)
    if (buffer) {
        res.sendFile(filePath, (err) => {
            if (err) throw err
            fs.rmSync(filePath)
        })
    }
})

app.listen(PORT, () => {
    console.log("started server")
})
