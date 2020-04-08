var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var multiparty = require('multiparty');

let db = require('../server/config/db');

/* POST login page */
router.post('/upload', function(req, res, next) {

    var form = new multiparty.Form();  //解析一个文件上传
    form.encoding = 'utf-8';  //设置编码
    form.uploadDir = './public/upload';  //设置文件储存路径
    form.maxFilesSize = 2 * 1024 * 1024;  //设置单文件大小限制
    
    form.parse(req, function(err, fields, files) {
        if (err) {
            throw err;
        } else {
            //fs.renameSync(files.path,files.originalFilename); //同步重命名文件名
            let filePath = files.files[0].path;
            let prePath = filePath.replace('public\\', '');
            res.json({ files: prePath });
        }
    });
    
});

module.exports = router;
