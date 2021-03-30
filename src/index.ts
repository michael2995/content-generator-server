import express from "express"
import router from "./router"
import "./config"

const PORT = process.env.PORT || 4321
const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json({}))
app.use(express.text({type: "text/plain"}))
app.use(express.text({type: "text/html"}))

app.use(router)

app.listen(PORT, () => {
    console.log("started server")
})
