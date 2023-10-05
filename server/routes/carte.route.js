const router = require("express").Router()
const carteController = require("../controllers/carte.controller")
const multer = require("multer")
const upload = multer()

router.get("/", carteController.readCarte)
router.post("/", upload.single("file"), carteController.createCarte)
router.put("/:id", carteController.updateCard)
router.delete("/:id", carteController.deleteCard)


module.exports = router