import { bootstrapServer } from "./app"

const PORT = process.env.PORT || 4321;

(async () => {
    const app = await bootstrapServer()
    app.listen(PORT, () => console.log("started server"))
})()
