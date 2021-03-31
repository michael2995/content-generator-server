import { Injectable } from "@nestjs/common";
import { v4 as uuidV4 } from "uuid"
import path from "path"
import {promisify} from "util"
import fs from "fs"

const __tmpdir = path.resolve(__dirname, "../_tmp")

@Injectable()
export class FileService {
    saveTemp (data: string | NodeJS.ArrayBufferView, ext: string): Promise<string> {
        const tmp_filename = `${uuidV4()}.${ext}`
        const tmp_filepath = path.resolve(__tmpdir, tmp_filename)
        return promisify(fs.writeFile)(tmp_filepath, data)
            .then(() => tmp_filename)
    }

    getTempUrl = async(data: string | NodeJS.ArrayBufferView, ext: string) => {
        const filename = await this.saveTemp(data, ext)
        return `${process.env.SERVER_ENDPOINT}:${process.env.PORT}/file?name=${filename}`
    }
}