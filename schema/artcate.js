// 导入验证规则模块
const joi = require("@hapi/joi");

// 定义校验规则
const name = joi.string().required();
/**
 * alphanum a-z A-Z 0-9
 * required 必填
 * */
const alias = joi.string().alphanum().required();
const id = joi.number().integer().min(1).required();

exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
};

exports.update_cate_schema = {
  body: {
    id,
    name,
    alias,
  },
};

exports.delete_cate_schema = {
  params: {
    id,
  },
};

exports.get_cate_schema = {
  params: {
    id,
  },
};
