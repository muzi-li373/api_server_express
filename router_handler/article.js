// 文章的处理函数模块
const path = require("path");
const db = require("../db/index");

// 发布文章的处理函数
exports.addArticle = (req, res) => {
  console.log(req);
  if (!req.file || req.file.fieldname !== "cover_img")
    return res.cc("文章封面是必选参数！");

  // TODO：证明数据都是合法的，可以进行后续业务逻辑的处理
  // 处理文章的信息对象
  const articleInfo = {
    // 标题、内容、发布状态、所属分类的Id
    ...req.body,
    // 文章封面的存放路径
    cover_img: path.join("/uploads", req.file.filename),
    // 文章的发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.user.id,
    // 设置删除标记，0表示未删除
    is_delete: 0,
  };

  const sql = `insert into ev_articles set ?`;
  db.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("发布新文章失败！");
    res.cc("发布文章成功！", 0);
  });
};

exports.getArticleList = (req, res) => {
  console.log(req.query);

  // 根据 state  cate_id pagenum pagesize 生成查询sql语句
  const { state, cate_id, pagenum = 1, pagesize = 10 } = req.query;

  // 构建查询条件
  let whereClause = "WHERE is_delete = 0";
  const params = [];

  // 根据状态筛选
  if (state) {
    whereClause += " AND state = ?";
    params.push(state);
  }

  // 根据分类ID筛选
  if (cate_id) {
    whereClause += " AND cate_id = ?";
    params.push(parseInt(cate_id));
  }

  // 先查询总条数
  const countSql = `SELECT COUNT(*) as total FROM ev_articles ${whereClause}`;

  db.query(countSql, params, (err, countResults) => {
    if (err) return res.cc(err);

    const total = countResults[0].total;

    // 再查询分页数据
    const offset = (parseInt(pagenum) - 1) * parseInt(pagesize);
    const dataSql = `SELECT * FROM ev_articles ${whereClause} ORDER BY pub_date DESC LIMIT ? OFFSET ?`;
    const dataParams = [...params, parseInt(pagesize), offset];

    db.query(dataSql, dataParams, (err, results) => {
      if (err) return res.cc(err);
      res.send({
        status: 0,
        message: "获取文章列表成功",
        data: results,
        total: total, // 总条数
        pagenum: parseInt(pagenum),
        pagesize: parseInt(pagesize),
      });
    });
  });
};
