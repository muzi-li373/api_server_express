const db = require("../db/index"); // 导入数据库操作模块

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
