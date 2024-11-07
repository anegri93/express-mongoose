const express = require("express");
const router = express.Router();
const user = require("../controller/User");

router.post("/user", user.createUser);
router.post("/login", user.loginUser);

module.exports = router;