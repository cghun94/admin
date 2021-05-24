require('dotenv').config();
const express = require('express');
const router = express.Router();
const mysqlconfig = require('./../config/mysql');
const mysqlConn = mysqlconfig.init();
mysqlconfig.open(mysqlConn); //연결 확인
const session = require('express-session');

const bcrypt = require('bcrypt');



// router.post('/', function(req, res, next) {
//     // console.log('logout post ',res.session.id);

//     return res.redirect('/');
// });//router.post end
  
// module.exports = router;