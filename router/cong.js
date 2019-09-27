var pg = require('pg');

var config = {
    user:"macbook",
    database: "flow",
    host:"localhost",
    password:"123456",
    port:5432,
    // 扩展属性
    max:20, // 连接池最大连接数
    idleTimeoutMillis:3000, // 连接最大空闲时间 3s
  }
  exports.pool = new pg.Pool(config);
// var mysql = require('mysql');
// var conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database:'flow',
//     port: 3306
// });
// exports.pool = conn;



















