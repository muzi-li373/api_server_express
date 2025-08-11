const express = require("express");
// 导入用户路由处理函数
const userHandler = require("../router_handler/user");

// 导入验证表单数据的中间件
const expressJoi = require("@escook/express-joi");
// 导入验证规则对象
const { reg_login_schema } = require("../schema/user");

// 路由模块
const router = express.Router();

/**
 * 注册用户信息
 * 声明局部中间件，对携带的参数进行验证
 * 数据验证通过后，将处理函数注册到路由上
 * 数据验证失败后，通过expressJoi中间件，自动给客户端返回错误信息
 **/
router.post("/reguser", expressJoi(reg_login_schema), userHandler.regUser);

// 登录
router.post("/login", expressJoi(reg_login_schema), userHandler.login);

module.exports = router;
