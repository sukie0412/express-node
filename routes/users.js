var express = require('express');
var router = express.Router();

let db = require('../server/config/db');

/* GET users listing. */
router.get('/list', function(req, res, next) {
    var username = req.query.username;
    let selectSQL = "select * from user where username = '" + username + "'";
    console.log(selectSQL)
    db.query(selectSQL, function(err, row){
        if(err) throw err;
        else{
            console.log(row);
            res.json(row);
        }
    })
});

router.post('/update', function(req, res, next){
    var currentData = req.body;
    var id = currentData.id;
    var username = currentData.username;
    var nickname = currentData.nickname;
    var phone = currentData.phone;
    var email = currentData.email;
    var sex = currentData.sex;
    var birth = currentData.birth;
    var location = currentData.location;

    let updateSQL =
      "update user set username = '" + username +"',nickname = '" +
      nickname +"',phone = '"+ phone +"',email = '"+ email +"',sex = '"+ sex +"',birth = '"+ birth +"',location = '"+ location +"' where id = " + id;
    db.query(updateSQL, function(err, row){
        if(err){
            res.json({result: false});
            throw err;
        }
        else{
            res.json({result: true})
        }
    })
})
module.exports = router;
