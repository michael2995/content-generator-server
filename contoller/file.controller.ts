import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from "express"
import { S3Service } from "../service/aws/s3.service";

@Controller("file")
export class FileController {
    constructor(
        private s3Service: S3Service
    ) {}
    @Get()
    async getFileFromS3(
        @Res() res: Response,
        @Query("name") name: string,
    ) {
        if (!name) return res.status(400).send("Please input filename")
        const object = await this.s3Service.getObject({Key: name})
        if (!object.Body) return res.status(404).send("Couldn't find file")
        await this.s3Service.deleteObject({Key: name})
        
        res.setHeader('Content-Type', 'image/png')
        res.send(object.Body)
    }
}