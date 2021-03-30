import {v4 as uuidV4} from "uuid"
import path from "path"
import fs from "fs"
import {promisify} from "util"

const __tmpdir = path.resolve(__dirname, "../_tmp")

export const saveTemp = (data: string | NodeJS.ArrayBufferView, ext: string): Promise<string> => {
    const tmp_filename = `${uuidV4()}.${ext}`
    const tmp_filepath = path.resolve(__tmpdir, tmp_filename)
    return promisify(fs.writeFile)(tmp_filepath, data)
        .then(() => tmp_filename)
}