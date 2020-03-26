var express = require('express');
var router = express.Router();

let db = require('../server/config/db');

/* GET page*/
router.get('/',function(req, res, next){
    res.render('login', { title: '登录' });
})

/* POST login page */
router.post('/',function(req, res, next){
    //获取请求传递过来的数据
    var currentData = req.body;
    var name = req.body.username;
    var psw = req.body.password;
    console.log(currentData);

    //模拟数据库查询判断，设置返回数据str
    var selectSQL = "select * from user where username = '"+ name +"' and password = '"+ psw +"' ";
    db.query(selectSQL , function(err, rows) {
        console.log(rows);
        if (err) {
            throw err;
        }else if(rows.length != 0){
            res.json({ result: true });
        }else{
            res.json({ result: false });
        }
    });
    // if(currentData.username == 'admin' && currentData.password == '123'){
    //     var str = {"result":{"username":currentData.username,"password":currentData.password},"code":1};
    // }else{
    //     var str = {"result":0};
    // }
    //res.writeHead(200,{"Content-Type":"text/plain","charset":"utf-8","Access-Control--Allow-Origin":"*","Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"}) //可解决跨域问题
    //str = JSON.stringify(str);
    //res.json(str);//返回json格式数据
})

module.exports = router;