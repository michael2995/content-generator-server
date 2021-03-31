import { Module } from "@nestjs/common";
import { FileController } from "../contoller/file.controller";
import { FileService } from "../service/file.service";
import { AwsModule } from "./aws.module";

@Module({
    imports: [AwsModule],
    providers: [FileService],
    exports: [FileService],
    controllers: [FileController]
})
export class FileModule {}