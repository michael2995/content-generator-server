import { bootstrapServer } from "./app"
import { Express } from "express"

const PORT = process.env.PORT || 4321

const startListening = (app: Express) => {
    app.listen(PORT, () => console.log("started server"))
}

bootstrapServer()
.then(startListening)
