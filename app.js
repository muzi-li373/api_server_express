const express = require("express");
const cors = require("cors");
const userRouter = require("./router/user"); // 用户路由
const joi = require("@hapi/joi");

const app = express();
const port = 3007;

// 配置cors跨域
app.use(cors());

// 配置解析application/x-www-form-urlencoded格式的请求体
app.use(express.urlencoded({ extended: false }));

// 影响数据的中间件
app.use(function (req, res, next) {
  // status, 0-成功  1-失败
  res.cc = function (err, status = 1) {
    // err是对象还是字符串
    res.send({ status, message: err instanceof Error ? err.message : err });
  };
  next();
});

// 挂载路由
app.use("/api", userRouter);

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // joi验证失败
  if (err instanceof joi.ValidationError) {
    return res.cc(err);
  }

  // 位置错误
  res.cc(err);
});

// 服务器
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
