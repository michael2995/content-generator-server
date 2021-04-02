declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SERVER_ENDPOINT: string
            PORT: string
            BUCKET_NAME: string
            BUCKET_FOLDER: string
            STAGE: "dev" | "prod"
        }
    }
}


export {}