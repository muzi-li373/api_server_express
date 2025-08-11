const mysql = require("mysql2");

// 创建连接对象
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "my_db_01",
});

module.exports = db;
