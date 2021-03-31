import { Module } from "@nestjs/common";
import { ConvertController } from "../contoller/convert.controller";
import { ConvertService } from "../service/convert.service";
import { BrowserModule } from "./browser.module";
import { FileModule } from "./file.module";

@Module({
    imports: [BrowserModule, FileModule],
    providers: [ConvertService],
    controllers: [ConvertController],
    exports: [ConvertService]
})
export class ConvertModule {}