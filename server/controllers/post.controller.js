const postModel = require("../models/post.model")
const userModel = require("../models/user.model")
const ObjectID = require("mongoose").Types.ObjectId
const fs = require("fs")
const {promisify} = require("util")
const { uploadErrors } = require("../utils/errors.utils")
const pipeline = promisify(require("stream"))

module.exports.readPost = (req,res) => {
    postModel.find((err,docs) => {
        if (!err) res.send(docs)
        else console.log("Error to get data" + err)
    }).sort ({createdAt: -1})
}

module.exports.createPost = async (req,res) => {
    let fileName

    if (req.file != null) {
        try {
            if (
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpeg" 
            )
            throw Error("invalid file")

            if (req.file.size > 500000) throw Error("taille maximale dépassée")

        } catch(err) {
            const errors = uploadErrors(err)
            return res.status(201).json({errors})
        }
        fileName = req.body.posterId + Date.now() + ".jpg"

        await pipeline(
            res.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/postImages/${filename}`
            )
        )
    }

    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file != null ? "./uploads/postImage/" + fileName: "",
        likers: [],
        dislikers: [],
        comments: [],
    })

    try {
        const post = await newPost.save()
        return res.status(201).json(post)
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.updatePost = (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    const updatedRecord = {
        picture: req.body.picture, 
        message: req.body.message,
    }

    postModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord},
        {new: true},
        (err,docs) => {
            if (!err) res.send(docs)
            else console.log("update errors:" + err)
        }
    )
}

module.exports.deletePost = (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

        postModel.findByIdAndRemove(req.params.id, (err,docs) => {
            if (!err) res.send(docs)
            else console.log("delete error:" + err)
        })
}

module.exports.likePost = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: {likers: req.body.id},},
            { new:true},
            (err) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id},
            },
            { news: true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.dislikePost = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: {dislikers: req.body.id},},
            { new:true},
            (err) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { dislikes: req.params.id},
            },
            { news: true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.unlikePost = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown :" + req.params.id)
    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id},
            },
            { new:true},
            (err) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id},
            },
            { news:true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.undislikePost = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown :" + req.params.id)
    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { dislikers: req.body.id},
            },
            { new:true},
            (err) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { dislikes: req.params.id},
            },
            { news:true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.commentPost = (req,res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id)

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterName: req.body.commenterName,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true},
            (err,docs) => {
                if (!err) return res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.editCommentPost = (req,res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id)

    try {
        return postModel.findById(req.params.id, (docs) => {
            const aComment = docs.comments.find((comment) => 
                comment._id.equals(req.body.commentId)
            )
            if (!aComment) return res.status(404).send("commentaire introuvable")

            aComment.text = req.body.text 

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs)
                return res.status(500).send(err)
            })
        })
    } catch {
        return res.status(400).send(err)
    }
}

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            {new: true},
            (err,docs) => {
                if (!err) return res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch (err) {
        res.status(400).send(err)
    }
}





