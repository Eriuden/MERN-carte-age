const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
require("dotenv").config({path: "./config/.env"})
require("./config/db")
const {checkUser, requireAuth  } = require("./middleware/auth.middleware")
const cors = require("cors")
const postRoutes = require("./routes/post.route")
const userRoutes = require("./routes/user.route")
const carteRoutes = require("./routes/carte.route")
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
app.get("/jwtid", requireAuth , (req, res) => {
    res.status(200).send(res.locals.user._id)
})

app.use("/api/user", userRoutes)
app.use("/api/post", carteRoutes)
app.use("/api/post", postRoutes)

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})