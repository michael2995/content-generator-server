import serverless, {Handler} from "serverless-http"
import { bootstrapServer } from "./app"

export const handler: Handler = async(event, context) => {
    const app = await bootstrapServer()
    return await serverless(app)(event, context)
}