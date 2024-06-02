const { addToPlaylist } = require("../controllers/UserController");

const router= require("express").Router();

router.post("/add", addToPlaylist)

module.exports=router;