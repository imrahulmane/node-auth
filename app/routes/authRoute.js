const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyAccessToken = require("../../middlewares/jwtAuth");

router.post('/signup',authController.signup);
router.post('/signin', authController.signin);
router.post('/refreshtoken', authController.getToken);

module.exports = router;