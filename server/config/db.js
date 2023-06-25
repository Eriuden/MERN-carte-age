const mongoose = require("mongoose")

mongoose
.connect(
    "mongodb+srv://"
    + process.env.DB_USER_PASS +

)
.then(()=> console.log("connecté à MongoDB"))
.catch((err) => console.log("échec de connexion", err))
