import "source-map-support/register"
import serverlessExpress from "@vendia/serverless-express"
import { bootstrapServer } from "./app"

export const handler = async (...params: Parameters<ReturnType<typeof serverlessExpress>>) => {
    const app = await bootstrapServer()
    return serverlessExpress({
        app,
    })(...params)
}
