import { Body, Controller, Put, Req, Res } from "@nestjs/common";
import { FileService } from "../service/file.service";
import { Request, Response } from "express"
import { ConvertService } from "../service/convert.service";

@Controller("convert")
export class ConvertController {
    constructor(
        private convertService: ConvertService,
        private fileService: FileService,
    ) {}

    @Put()
    async convertAsUrl(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: string,
    ) {
        console.log(req.readable)
        console.log(body)
        const {html2png} = this.convertService
        const {getTempUrl} = this.fileService
        const buffer = await html2png(body)
    
        if (!buffer) return res.status(400).send("Nothing was convertable")
    
        const tempUrl = await getTempUrl(buffer, "png")
    
        if (buffer) {
            res.send(tempUrl)
        }
    }
}