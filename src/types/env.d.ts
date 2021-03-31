declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SERVER_ENDPOINT: string
            PORT: string
            BUCKET_NAME: string
        }
    }
}


export {}