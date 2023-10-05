const carteModel = require("../models/carte.model")
const ObjectID = require("mongoose").Types.ObjectId
const fs = require("fs")
const {promisify} = require("util")
const { uploadErrors } = require("../utils/errors.utils")
const pipeline = promisify(require("stream"))

module.exports.readCarte = (req,res) => {
    carteModel.find((err,docs) => {
        if (!err) res.send(docs)
        else console.log("Error to get data" + err)
    }).sort ({createdAt: -1})
}

module.exports.createCarte = async (req,res) => {
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
        fileName = req.body._id + Date.now() + ".jpg"

        await pipeline(
            res.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/postImages/${fileName}`
            )
        )
    }

    const newCarte = new carteModel({
        
        picture: req.file != null ? "./uploads/carteImage/" + fileName: "",
        name: req.body.name,
        grade: req.body.grade,
        power: req.body.power,
        effect: req.body.effect,
        shield: req.body.shield,
        nation: req.body.nation,
    })

    try {
        const post = await newCarte.save()
        return res.status(201).json(post)
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.updateCard = (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    const updatedRecord = {
        picture: req.body.picture, 
        name: req.body.name,
        grade: req.body.grade,
        power: req.body.power,
        effect: req.body.effect,
        shield: req.body.shield,
        nation: req.body.nation,
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

module.exports.deleteCard = (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

        postModel.findByIdAndRemove(req.params.id, (err,docs) => {
            if (!err) res.send(docs)
            else console.log("delete error:" + err)
        })
}









