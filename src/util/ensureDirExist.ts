import fs from "fs"

export const ensureDirExist = (dirPath: string) => {
    const dir = fs.existsSync(dirPath)
    if (!dir) fs.mkdirSync(dirPath)
}