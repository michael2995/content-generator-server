import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { Personnel } from "../interface/personnel.interface";
import { BusinessCard } from "../react/components";
import { BrowserService } from "../service/browser.service";
import { ConvertService } from "../service/convert.service";
import { FileService } from "../service/file.service";

const getQueryKeys = ["name", "email", "phone", "part", "role"] as const;

@Controller("card")
export class CardController {
    constructor(
        private fileService: FileService,
        private convertService: ConvertService,
    ) {}

    @Get()
    async generateCard(@Query() query: Personnel, @Res() res: Response) {
        const {element2png} = this.convertService
        const {getTempUrl} = this.fileService
        const {email, name, part, phone, role} = query
        for (const queryKey of getQueryKeys) {
            if (!query[queryKey]) return res.status(400).send(`${queryKey} is undefined`)
        }

        const CardFront = BusinessCard({name, email, phone, part, role, side: "front"})
        const CardBack = BusinessCard({name, email, phone, part, role, side: "back"})
        const frontBuffer = await element2png(CardFront)
        const backBuffer = await element2png(CardBack)
        
        if (!frontBuffer || !backBuffer) return res.status(500).send("can't generate image")

        const tmp_front_img = await getTempUrl(frontBuffer, "png")
        const tmp_back_img = await getTempUrl(backBuffer, "png")

        res.json({
            front: tmp_front_img,
            back: tmp_back_img,
        })
    }
}