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
      message: "获取文章分类数据成功",
      data: results,
    });
  });
};

// 新增文章分类
exports.addArticleCates = (req, res) => {
  // 定义查重sql语句，查重条件是名称或别名是否重复
  const sql = `select * from ev_article_cate where name=? or alias=?`;
  // 执行查重sql语句
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    // 判断sql是否出错
    if (err) return res.cc(err);
    // 查重结果不为空
    if (results.length === 2) return res.cc("文章分类名称与别名已存在");
    if (
      results.length === 1 &&
      results[0].name === req.body.name &&
      results[0].alias === req.body.alias
    ) {
      return res.cc("文章分类名称与别名已存在");
    }
    if (results.length === 1 && results[0].name === req.body.name)
      return res.cc("文章分类名称已存在");
    if (results.length === 1 && results[0].alias === req.body.alias)
      return res.cc("文章分类别名已存在");

    // 执行新增操作
    const sql = `insert into ev_article_cate set ?`;
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("新增文章分类失败");
      res.cc("新增文章分类成功", 0);
    });
  });
};

// 更新文章分类
exports.updateArticleCates = (req, res) => {
  // 定义sql语句
  const sql = `update ev_article_cate set ? where id=?`;
  // 执行sql语句
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("更新文章分类失败");
    res.cc("更新文章分类成功", 0);
  });
};

// 删除文章分类的路由处理函数
exports.deleteCateById = (req, res) => {
  // 定义sql语句
  const sql = `update ev_article_cate set is_delete=1 where id=?`;
  // 执行sql语句
  db.query(sql, req.params.id, (err, results) => {
    console.log(results);

    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("删除文章分类失败");
    // 如果id对应的文章分类不存在，则返回错误提示信息
    if (results.affectedRows === 0) return res.cc("文章分类不存在");
    res.cc("删除文章分类成功", 0);
  });
};
