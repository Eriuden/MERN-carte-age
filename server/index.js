const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config({path:"./config/.env"})
require("./config/db")
const {checkUser, requireAuth} = require("./middleware/auth.middleware")
cors = require("cors")
const userRoutes = require("./routes/user.route")
//Les posts seront les exemples de decks
const postRoutes = require("./routes/post.route")
const app = express()

app.use(cors({origin: process.env.CLIENT_URL}))

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    "allowedHeaders": ["sessionId", "content-type"],
    "exposedHeaders": ["sessionId"],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false 
}

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.get("*", checkUser)
app.get("/jwtid", requireAuth, (req,res) => {
    res.status(200).send(res.locals.user._id)
})

app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Branché au port ${process.env.PORT}`)
})