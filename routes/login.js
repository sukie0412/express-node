var express = require('express');
var router = express.Router();

/* GET page*/
router.get('/',function(req, res, next){
    res.render('login', { title: '登录' });
})

/* POST login page */
router.post('/',function(req,res,next){
    console.log('post---login');
    //获取请求传递过来的数据
    var currentData = req.body;
    console.log(currentData);
    //模拟数据库查询判断，设置返回数据str
    if(currentData.username == 'admin' && currentData.password == '123'){
        var str = {"result":{"username":currentData.username,"password":currentData.password},"code":1};
    }else{
        var str = {"result":0};
    }
    //res.writeHead(200,{"Content-Type":"text/plain","charset":"utf-8","Access-Control--Allow-Origin":"*","Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"}) //可解决跨域问题
    //str = JSON.stringify(str);
    res.json(str);//返回json格式数据
})

module.exports = router;