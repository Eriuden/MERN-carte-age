const mongoose = require("mongoose")

mongoose
.connect(
    "mongodb+srv://"
    + process.env.DB_USER_PASS +
    "@cluster0.iodcc.mongodb.net/GenDate"
)
.then(()=> console.log("connecté à MongoDB"))
.catch((err) => console.log("échec de connexion", err))