//创建数据库连接
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "webviews00123",
    database: "websql"
})

connection.connect((err) => {
    if(err) console.log('数据库连接失败')
    else console.log('数据库连接成功')
})

let query = (sql, callback) => {
    connection.query(sql, function (err, rows){
        callback(err, rows);
    })
}

exports.query = query;