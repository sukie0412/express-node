var express = require('express');
var router = express.Router();
var formidable = require('formidable');
//var multipartMiddleware = multipart(); 

// let bodyParser = require('body-parser');
let db = require('../server/config/db');

/* POST login page */
router.post('/', function(req, res, next) {
    console.log('upload------------')
    var currentData = req.body;
   // console.log('currentData',currentData);
    var form = new formidable.IncomingForm();
        console.log(0)
        form.encoding = 'utf-8'; //编码
        form.uploadDir = 'images/upload'; //存储路径
        form.keepExtensions = true; //保留扩展名
        form.maxFileSize = 2 * 1024 * 1024; //文件大小
        form.parse(req, function(err, fileds, files){ // 解析 formData数据
            console.log(11111,req.body)
            console.log(22222,files.img);
            if(err){return console.log(err)}

            let imgPath = files.img.path;  //获取文件路径
            console.log('imgPath'+imgPath);
            let imgName = "./test."+ files.img.type.split("/")[1]; //修改之后的名字
            let data = fs.readFileSync('imgPath'); //同步读取文件
            console.log('imgName'+imgName)
            fs.wirteFile(imgName,data,function(err){  //存储文件
                if(err) return console.log(err);
                fs.unlink(imgPath,function(){  //删除文件
                    res.json({imgPath})
                })
            })
        })
        //form.onPart(part);
});

// router.post('/', multipartMiddleware, function(req, res) {
//   res.json({ result: 'success', data: req.body });
// });

router.post('/cc', function(req, res, next) {
    console.log('ccccc------------');
    var currentData = req.body;
    console.log('currentData', currentData);
});
module.exports = router;
