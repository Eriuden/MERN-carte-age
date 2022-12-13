const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
        name: {
            Type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true,
        },

        email: {
            Type:String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
        },

        password: {
            Type: String,
            required: true,
            max: 1024,
            minlength: 6
        },

        bio: {
            Type: String,
            max: 500,
        },

    },

    {
        timestamps:true,
    }
)

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.static.login = async function(email,password){
    const user = await this.findOne({email})
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error("Mot de passe incorrect")
    }
    throw Error("Adresse mail incorrect")
}

const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel