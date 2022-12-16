const userModel = require("../models/user.model")
const ObjectID = require("mongoose").Types.ObjectId

module.exports.getAllUsers = async (req,res) => {
    const users = await userModel.find().select("-password")
    res.status(200).json(users)
}

module.exports.getUser = (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow :" + req.params.id)

    userModel.findById(req.params.id, (err,docs) => {
        if(!err) res.send(docs)
        else console.log("ID unknow:" + err)
    }).select("-password")
}

module.exports.updateUser = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow:" + req.params.id)

    try {
        await userModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set : {
                    name: req.body.name,
                    picture: req.body.picture,
                    bio: req.body.bio 
                }
            },
            { new:true, upsert:true, setDefaultsOnInsert:true},
            (err,docs) => {
                if (!err) return res.send(docs)
                if (err) return res.status(500).send({message: err})
            }
        )
    } catch(err) {
        return res.status(500).json({message:err})
    }
}

module.exports.deleteUser = async (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow :" + req.paramis.id)
    try {
        await userModel.remove({_id: req.params.id}).exec()
        res.status(200).json({message: "Au revoir"})
    } catch(err) {
        return res.staus(500).json({message:err})
    }
}