const mongoose = require("mongoose")


const postSchema = new mongoose.Schema(

    {
        posterId: {
            type: String,
            required: true
        },

        picture: {
            type: String,
            required: true
        },

        message: {
            type: String,
            trim: true,
            maxlength: 2000,
        },
        likers: {
            type: [String],
            required: true,
        },
        dislikers: {
            type: [String],
            required: true,
        },
        
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number,
                }
            ],
            required: true,
        },
        
    },
    {timestamps: true}
)

const postModel = mongoose.model("post", postSchema)
module.exports = postModel