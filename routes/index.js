var express = require('express');
var router = express.Router();
var cookieSession = require('cookie-session');

let db = require("../server/config/db");

router.use(
  cookieSession({
    name: 'isLogin',
    keys: ['aaa'],
    maxAge: 2 * 60 * 1000,
    isLogin: 'true'
  })
);

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

router.post('/logout', (req, res, next) => {
    req.session.isLogin = null;
    res.json({ result: true });
});
module.exports = router;
