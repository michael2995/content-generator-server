import dotenv from "dotenv"
import path from "path"
import { ensureDirExist } from "../util/ensureDirExist"

ensureDirExist(path.resolve(__dirname, "../_tmp"))

dotenv.config({
    path: path.resolve(__dirname, "../../.env")
})
