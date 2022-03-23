const express = require("express");
const { signup, login } = require("../../controler/admin/auth");
const router = express.Router();


router.post('/admin/login', login)
router.post('/admin/signup', signup)


module.exports = router