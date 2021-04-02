import { Module } from "@nestjs/common";
import { BrowserService } from "../service/browser.service";

@Module({
    providers: [BrowserService],
    exports: [BrowserService]
})
export class BrowserModule {}