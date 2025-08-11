const db = require("../db/index"); // 数据库模块
// 密码加密
const bcrypt = require("bcryptjs");
// 生成Token
const jwt = require("jsonwebtoken");
// 导入全局配置文件
const config = require("../config");

// 注册新用户
exports.regUser = (req, res) => {
  const { username, password } = req.body; // 获取客户端提交到服务器的用户名和密码
  // if (!username || !password) {
  //   return res.send({ status: 1, message: "用户名或密码不能为空" });
  // }

  // 定义sql,查询用户名是否被占用
  const sqlSrt = "select * from ev_users where username=?";
  db.query(sqlSrt, [username], (err, result) => {
    if (err) {
      // 执行sql语句失败
      // return res.send({ status: 1, message: err.message });
      return res.cc(err);
    }
    // 判断用户名是否被占用
    if (result.length) {
      // return res.send({ status: 1, message: "用户名被占用" });
      return res.cc("用户名被占用");
    }

    // 用户名可以使用，进行注册操作

    const pwd = bcrypt.hashSync(password, 10); // 10表示加密的"强度" 10-12之间都行，默认为10
    // 写入数据库
    db.query(
      `insert into ev_users set ?`,
      { username, password: pwd },
      (err, result) => {
        if (err) {
          // return res.send({ status: 1, message: "注册失败" });
          return res.cc("注册失败");
        }
        // SQL执行成功，但影响行数不为1，则认为是插入失败
        if (result.affectedRows !== 1) {
          // return res.send({ status: 1, message: "注册失败，请稍后再试" });
          return res.cc("注册失败，请稍后再试");
        }
        // res.send({ status: 0, message: "注册成功" });
        res.cc("注册成功", 0);
      }
    );
  });
};

// 登录
exports.login = (req, res) => {
  // 接收表单的数据
  const { username, password } = req.body;
  // 定义sql语句，查询用户名是否存在
  const sqlStr = "select * from ev_users where username=?";
  db.query(sqlStr, [username], (err, result) => {
    if (err) {
      return res.cc(err);
    }
    // 判断用户名是否存在
    if (result.length !== 1) {
      return res.cc("登录失败");
    }
    // 对比密码
    const compareResult = bcrypt.compareSync(password, result[0].password);
    if (!compareResult) {
      return res.cc("登录失败");
    }

    const user = { ...result[0], password: "", user_pic: "" }; // 返回给客户端的用户信息中，不包含密码

    // 生成Token字符串
    const token = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn, // 过期时间
    });
    console.log("🚀 ~ file: user.js:79 ~ token:", token);

    res.send({
      status: 0,
      message: "登录成功",
      token: "Bearer " + token, // 返回给客户端的token字符串
    });
  });
};
