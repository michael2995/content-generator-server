import { Module } from "@nestjs/common";
import { AppController } from "../contoller/app.controller";
import { CardModule } from "./card.module";

@Module({
    imports: [CardModule],
    controllers: [AppController]
})
export class AppModule {}