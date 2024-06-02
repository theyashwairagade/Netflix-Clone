const { addToPlaylist, getPlaylist } = require("../controllers/UserController");

const router= require("express").Router();

router.post("/add", addToPlaylist);
router.get("/liked/:email",getPlaylist);

module.exports=router;