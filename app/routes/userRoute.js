const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyAccessToken = require("../../middlewares/jwtAuth");

router.get('/:id',  verifyAccessToken, userController.getUser);
router.get('/', verifyAccessToken, userController.getAllUsers);

module.exports = router;