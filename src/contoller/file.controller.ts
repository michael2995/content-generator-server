import { Controller, Get, Query, Req, Res } from "@nestjs/common";
import { Request, Response } from "express"
import path from "path"
import fs from "fs"

@Controller("file")
export class FileController {
    @Get()
    async some(@Res() res: Response, @Query("name") name: string) {
        const __tmpdir = path.resolve(__dirname, "../_tmp")
        if (!name) return res.status(404).send("couldn't find file")
        const filepath = path.resolve(__tmpdir, name)
        res.sendFile(filepath, (err) => {
            if (err) throw err
            fs.unlinkSync(filepath)
        })
        
    }
}