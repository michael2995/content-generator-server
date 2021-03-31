import { Module } from "@nestjs/common";
import { FileController } from "../contoller/file.controller";
import { FileService } from "../service/file.service";

@Module({
    providers: [FileService],
    exports: [FileService],
    controllers: [FileController]
})
export class FileModule {}