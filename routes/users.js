var express = require('express');
var router = express.Router();
const { getUserList, createUser, login } = require('./../controllers/userController')


router.route("/users")
    .get(getUserList)
    .post(createUser)

router.route("/auth/login")
    .post(login)

module.exports = router;
