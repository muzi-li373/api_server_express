const express = require("express");
// 文章分类路由模块
const artCate_handler = require("../router_handler/artcate");

const router = express.Router();

// 获取文章分类的列表数据
router.get("/cates", artCate_handler.getArticleCates);

module.exports = router;
