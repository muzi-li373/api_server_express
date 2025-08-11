// 获取文章分类的列表数据
exports.getArticleCates = (req, res) => {
  res.send({
    status: 0,
    message: "获取成功",
    data: [
      { id: 1, name: "新闻资讯" },
      { id: 2, name: "业界动态" },
      { id: 3, name: "业界动态" },
      { id: 4, name: "业界动态" },
    ],
  });
};
