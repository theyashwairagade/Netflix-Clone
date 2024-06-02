const { addToPlaylist, getPlaylist, removeFromPlaylist } = require("../controllers/UserController");

const router= require("express").Router();

router.post("/add", addToPlaylist);
router.get("/liked/:email",getPlaylist);
router.put("/delete",removeFromPlaylist);

module.exports=router;