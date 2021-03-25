import { Router } from "express"
import {
    cardController,
    convertController,
    fileController,
} from "../contoller"

const router = Router()

router.get("/", (req, res) => res.send("ok"))

router.put("/convert", convertController.put)

router.get("/card", cardController.get)

router.get("/file", fileController.get)

export default router