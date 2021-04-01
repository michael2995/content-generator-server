import { Injectable } from "@nestjs/common";
import AWS from "aws-sdk";
import {
    ListBucketsOutput,
    PutObjectRequest,
    PutObjectOutput,  
    ManagedUpload,
    ListObjectsRequest,
    ListObjectsOutput,
    DeleteObjectRequest,
    DeleteObjectOutput,
    GetObjectRequest,
    GetObjectOutput,
} from "aws-sdk/clients/s3"

@Injectable()
export class S3Service {
    private s3 = new AWS.S3({apiVersion: "2006-03-01"})
    private folder = process.env.BUCKET_FOLDER
    private name = process.env.BUCKET_NAME as string
    constructor() {
        this.ensureBucket()
    }

    private ensureBucket = async () => {
        console.log("ensuring bucket")
        console.log("current environment variables: ", process.env)
        const list = await this.listBuckets()
        const existing = list.Buckets?.find((bucket) => bucket.Name === this.name)
        if (existing) return true

        try {
            await this.createBucket()
        } catch (e) {
            throw new Error("Couldn't create bucket")
        }
    }

    private listBuckets = async (): Promise<ListBucketsOutput> => {
        return new Promise((resolve, reject) => {
            this.s3.listBuckets((err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
    
    private createBucket = async () => {
        return new Promise((resolve, reject) => {
            this.s3.createBucket({ Bucket: this.name }, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }

    uploadObject = async(
        params: Omit<PutObjectRequest, "Bucket">,
        options?: ManagedUpload.ManagedUploadOptions
    ): Promise<PutObjectOutput> => {
        params.Key = `${this.folder}/${params.Key}`
        const namedParams = { ...params, Bucket: this.name }
        return new Promise((resolve, reject) => {
            this.s3.upload(namedParams, options, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }

    listObjects = async(params?: Omit<ListObjectsRequest, "Bucket">): Promise<ListObjectsOutput> => {
        const namedParams = { ...params, Bucket: this.name }
        return new Promise((resolve, reject) => {
            this.s3.listObjects(namedParams, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }

    getObject = async(params: Omit<GetObjectRequest, "Bucket">): Promise<GetObjectOutput> => {
        params.Key = `${this.folder}/${params.Key}`
        const namedParams = { ...params, Bucket: this.name }
        return new Promise((resolve, reject) => {
            this.s3.getObject(namedParams, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }

    deleteObject = async(params: Omit<DeleteObjectRequest, "Bucket">): Promise<DeleteObjectOutput> => {
        params.Key = `${this.folder}/${params.Key}`
        const namedParams = { ...params, Bucket: this.name }
        return new Promise((resolve, reject) => {
            this.s3.deleteObject(namedParams, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
}