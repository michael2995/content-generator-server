import fs from "fs"

export const ensureDirExist = (dirPath: string) => {
    const dir = fs.readdirSync(dirPath)
    if (!dir) fs.mkdirSync(dirPath)
}