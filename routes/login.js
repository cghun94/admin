const express = require('express');
const router = express.Router();
const mysqlconfig = require('./../config/mysql');
const mysqlConn = mysqlconfig.init();
mysqlconfig.open(mysqlConn); //연결 확인
const crypto = require('crypto');
const hash =crypto.createHash('')
const session = require('express-session');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     // res.redirect("/main");
// });

/* post users listing. */
router.post('/', function(req, res, next) {
    
    let body = req.body;
    let sql = `SELECT * FROM users where id = ? and pw = ?`;
    let param = [body.id , body.password];
        mysqlConn.query(sql , param ,function (err, results, fields) {
            if(results.length === 0 ){
                console.log('로그인 실패');
                res.redirect('/');
            }
            else{
                console.log('로그인 성공');
                res.session.id
            }

            

            // res.json({data});
    });
    
});
  
  module.exports = router;