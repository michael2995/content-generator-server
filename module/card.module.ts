import { Module } from "@nestjs/common";
import { CardController } from "../contoller/card.controller";
import { ConvertModule } from "./convert.module";
import { FileModule } from "./file.module";

@Module({
    imports: [FileModule, ConvertModule],
    controllers: [CardController],
})
export class CardModule {}