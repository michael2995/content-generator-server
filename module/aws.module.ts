import { Module } from "@nestjs/common";
import AWS from "aws-sdk"
import { S3Service } from "../service/aws/s3.service";

AWS.config.update({
    region: "ap-northeast-2"
})

@Module({
    providers: [S3Service],
    exports: [S3Service]
})
export class AwsModule {}