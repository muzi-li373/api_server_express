exports.getUserInfo = (req, res) => {
  res.send({ status: 0, message: "获取用户信息成功", data: req.user });
};
