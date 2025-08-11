const db = require("../db/index"); // 数据库模块
// 密码加密
const bcrypt = require("bcryptjs");

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
  res.send("登录成功");
};
