import { Injectable } from "@nestjs/common";
import { v4 as uuidV4 } from "uuid"
import {promisify} from "util"
import path from "path"
import fs from "fs"
import { S3Service } from "./aws/s3.service";

const __tmpdir = path.resolve(__dirname, "../_tmp")

@Injectable()
export class FileService {
    constructor(
        private s3Service: S3Service
    ) {}
    
    saveTemp = async(data: string | NodeJS.ArrayBufferView, ext: string) => {
        const tmp_filename = `${uuidV4()}.${ext}`

        const uploaded = await this.s3Service.uploadObject({
            Key: tmp_filename,
            Body: data,
        })

        return tmp_filename
    }

    getTempUrl = async(data: string | NodeJS.ArrayBufferView, ext: string) => {
        const filename = await this.saveTemp(data, ext)
        return `${process.env.SERVER_ENDPOINT}:${process.env.PORT}/file?name=${filename}`
    }

    getFile = async(Key: string) => {
        const object = await this.s3Service.getObject({Key})
        return object
    }
}