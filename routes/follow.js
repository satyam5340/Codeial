const express = require('express');

const router = express.Router();

const followController = require('../controllers/followers_controller');


router.get("/",followController.toggleFollow);


module.exports = router;