const express = require("express");
// 验证数据合法性的中间件
const expressJoi = require("@escook/express-joi");
// 导入需要验证的规则对象
const {
  update_userInfo_schema,
  update_password_schema,
  update_avatar_schema,
} = require("../schema/user");
const router = express.Router();

// 导入用户路由处理函数
const userInfo_handler = require("../router_handler/userInfo");

// 获取用户信息
router.get("/userInfo", userInfo_handler.getUserInfo);

// 更新用户信息
router.post(
  "/updateUserInfo",
  expressJoi(update_userInfo_schema),
  userInfo_handler.updateUserInfo
);

// 更新密码
router.post(
  "/updatePwd",
  expressJoi(update_password_schema),
  userInfo_handler.updatePassword
);

// 更新头像
router.post(
  "/update/avatar",
  expressJoi(update_avatar_schema),
  userInfo_handler.updateAvatar
);

module.exports = router;
