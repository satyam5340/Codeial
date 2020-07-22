const express = require("express")
const passport = require('passport');
const router = express.Router()

const postsApi = require("../../../controllers/api/v1/post_api");

router.get("/posts",postsApi.index);
router.delete("/destroy/:id",passport.authenticate("jwt",{session:false}),postsApi.destroy);
module.exports = router;