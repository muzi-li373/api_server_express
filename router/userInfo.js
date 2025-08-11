const express = require("express");
const router = express.Router();

// 获取用户信息
router.get("/userInfo", (req, res) => {
  // req.userInfo 是在 app.js 中定义的中间件，用于获取用户信息
  res.send({
    status: 0,
    message: "获取用户信息成功",
    data: req.user,
  });
});

module.exports = router;
