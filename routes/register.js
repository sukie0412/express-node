var express = require('express');
var router = express.Router();

let db = require('../server/config/db');

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
                res.json({ result: true });
            });
        }
    })
})

module.exports = router;