const express = require("express");
const router = express.Router();

// 导入用户路由处理函数
const userInfo_handler = require("../router_handler/userInfo");

// 获取用户信息
router.get("/userInfo", userInfo_handler.getUserInfo);

module.exports = router;
