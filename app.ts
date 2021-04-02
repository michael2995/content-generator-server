import { NestFactory } from "@nestjs/core"
import { AppModule } from "./module/app.module"
import { ExpressAdapter } from "@nestjs/platform-express"
import express, {Express } from "express"

let app: Express

export async function bootstrapServer(): Promise<Express> {
    if (!app) {
        const expressApp = express()
        const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp))
        nestApp.use(express.urlencoded({extended: false}))
        nestApp.use(express.json())
        nestApp.use(express.text())
        nestApp.use(express.text({type: "text/html"}))
        await nestApp.init()
        app = expressApp
    }
    return app
}