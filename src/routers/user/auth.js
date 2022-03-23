const express = require("express");
const { signup, login } = require("../../controler/admin/auth");
const router = express.Router();


router.post('/login', login)
router.post('/signup', signup)


module.exports = router