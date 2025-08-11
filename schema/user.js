// 验证规则的包
const joi = require("@hapi/joi"); // 为表单中携带的每个数据项,定义验证规则

/**
 * alphanum() 限制只能是字母和数字，"a-z"、"A-Z" 以及 "0"、"9" 。
 * min() 限制最小长度
 * max() 限制最大长度
 * required() 必填项
 * pattern() 正则表达式
 * */
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

// 定义id,nickname,email的验证规则对象
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

// 定义验证注册、登录表单的验证规则对象
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};

exports.update_userInfo_schema = {
  body: {
    id,
    nickname,
    email,
  },
};
