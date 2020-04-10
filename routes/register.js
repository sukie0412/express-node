var express = require('express');
var router = express.Router();
var cookieSession = require('cookie-session');

let db = require('../server/config/db');

router.use(
    cookieSession({
        name: 'isLogin',
        keys: ['aaa'],
        maxAge: 2 * 60 * 1000,
        isLogin: 'true'
    })
);
/* POST login page */
router.post('/',function(req, res, next){
    console.log('register----')
    var currentData = req.body;
    var name = currentData.username;
    var psw = currentData.password;

    let selectSQL = " select * from user where username = '"+name+"'";
    db.query(selectSQL, function(err, row){
        if(err) throw err;
        else if(row.length != 0){
            res.json({ result: "repeat"});
        }else{
            let insertSQL = "insert into user(id,username,password) values(id,'"+ name +"','"+ psw +"')";
            db.query(insertSQL, function(err, rs) {
                if (err) throw err;
                req.session.isLogin = true;
                res.json({ result: true });
            });
        }
    })
})

module.exports = router;