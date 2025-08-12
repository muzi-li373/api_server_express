const express = require("express");
// 校验规则模块
const expressJoi = require("@escook/express-joi");

// 文章分类路由模块
const artCate_handler = require("../router_handler/artcate");
// 导入文章分类的验证规则
const {
  add_cate_schema,
  update_cate_schema,
  delete_cate_schema,
  get_cate_schema,
} = require("../schema/artcate");

const router = express.Router();

// 获取文章分类的列表数据
router.get("/cates", artCate_handler.getArticleCates);

// 新增文章分类
router.post(
  "/addcates",
  expressJoi(add_cate_schema),
  artCate_handler.addArticleCates
);

// 更新文章分类
router.post(
  "/updatecates",
  expressJoi(update_cate_schema),
  artCate_handler.updateArticleCates
);

//根据id删除文章分类
router.get(
  "/deletecate/:id",
  expressJoi(delete_cate_schema),
  artCate_handler.deleteCateById
);

// 根据id获取文章分类
router.get(
  "/cates/:id",
  expressJoi(get_cate_schema),
  artCate_handler.getArtCateById
);

module.exports = router;
