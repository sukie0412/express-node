var express = require('express');
var router = express.Router();

let db = require("../server/config/db");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/first',(req, res, next) => {
    let sql = "select * from sentence"
    db.query(sql,(err, rows) => {
        if(err){
            res.json({err:"errorrrrrr"});
        }else{
            res.json({list:rows})
        }
    })
})
module.exports = router;
