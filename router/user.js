const express = require("express");
// 导入用户路由处理函数
const userHandler = require("../router_handler/user");

const router = express.Router();

// 注册新用户
router.post("/reguser", userHandler.regUser);

// 登录
router.post("/login", userHandler.login);

module.exports = router;
