const mongoose = require("mongoose")


const carteSchema = new mongoose.Schema(

    {

        picture: {
            type: String,
            required: true
        },

        name: {
            type: String,
            trim: true,
            maxlength: 200,
        },

        power: {
            type: Number,
            trim: true,
            maxlength: 20,
        },

        effect: {
            type: String,
            trim: true,
            maxlength: 2000,
        },

        shield: {
            type: Number,
            trim: true,
            maxlength: 20,
        },

        nation: {
            type: String,
            trim: true,
            maxlength: 200,
        },

        
    },
    {timestamps: true}
)

const carteModel = mongoose.model("carte", carteSchema)
module.exports = carteModel