// 数据库操作模块
const db = require("../db/index");

// 获取文章分类的列表数据
exports.getArticleCates = (req, res) => {
  // 获取没有被删除的文章分类列表数据
  // asc 从小打到大
  const sql = `select * from ev_article_cate where is_delete=0 order by id asc`;

  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "获取成功",
      data: results,
    });
  });
};
