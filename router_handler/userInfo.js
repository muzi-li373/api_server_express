const db = require("../db/index"); // 导入数据库操作模块
const bcrypt = require("bcryptjs"); // 导入密码加密模块

// 获取用户信息
exports.getUserInfo = (req, res) => {
  // 根据id查询用户信息
  const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`;
  db.query(sql, [req.user.id], (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) {
      return res.cc("获取用户信息失败");
    }
    res.send({ status: 0, message: "获取用户信息成功", data: result[0] });
  });
};

// 更新用户信息
exports.updateUserInfo = (req, res) => {
  // 更新用户信息
  const sql = `update ev_users set ? where id=?`;
  db.query(sql, [req.body, req.body.id], (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) {
      return res.cc("更新用户信息失败");
    }
    res.cc("更新用户信息成功", 0);
  });
};

// 更新密码
exports.updatePassword = (req, res) => {
  // 根据id 查询用户信息
  const sql = `select * from ev_users where id=?`;
  db.query(sql, req.user.id, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc("用户不存在");
    // 旧密码和数据库是否一致
    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      result[0].password
    ); // true false
    if (!compareResult) return res.cc("原密码错误");
    // 更新密码
    const updatePwdSql = `update ev_users set password=? where id=?`;
    // 对新密码进行加密
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    db.query(updatePwdSql, [newPwd, req.user.id], (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("更新密码失败");
      res.cc("更新密码成功", 0);
    });
  });
};

// 更新头像
exports.updateAvatar = (req, res) => {
  const sql = `update ev_users set user_pic=? where id=?`;
  db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc("更新头像失败");
    res.cc("更新头像成功", 0);
  });
};
