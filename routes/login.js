require('dotenv').config();
const express = require('express');
const router = express.Router();
const mysqlconfig = require('./../config/mysql');
const mysqlConn = mysqlconfig.init();
mysqlconfig.open(mysqlConn); //연결 확인
const session = require('express-session');

const bcrypt = require('bcrypt');
/*
const saltRounds = Number(process.env.saltRounds);//salt 를 만들기 위해 몇번 돌릴지 정했다
console.log('saltRounds = ', saltRounds); //몇번돌렸는지 확인
const salt = bcrypt.genSaltSync(saltRounds); //salt 만들기
*/
const salt = process.env.salt;  //만든 salt 저장하고 불러오기
// console.log('salt = ', salt); //salt 확인하기

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     // res.redirect("/main");
// });


/* post users listing. */
router.post('/', function(req, res, next) {
    
    let body = req.body;
    let sql = `SELECT * FROM users where id = ?`;
    console.log('body.id = ',body.id);
    console.log('body.password = ',body.password);
    let bodypw= body.password;
    
    const body_hash = bcrypt.hashSync(bodypw, salt);
    // console.log('body_hash' , body_hash); //body 비밀번호 해시
    let db_hash;
    let param = [body.id];
    
        //db 조회
        mysqlConn.query(`SELECT * FROM users where id = ?` , [body.id] ,function (err, db, fields) {
            if(db.length === 0 ){
                console.log('로그인 실패 아이디 없음');
                res.redirect('/');
            }
            else{
                //아이디 존재, 비밀번호 확인
                db_hash =  bcrypt.hashSync(db[0].pw, salt);;
                // console.log('db_hash' , db_hash); //db 비밀번호 해시
                if( body_hash === db_hash ){
                    console.log('비번 ok , 로그인 성공');
                    req.session.id = body.id;
                    let userdata = {
                        id : db[0].id,
                        name : db[0].name
                    } 
                    // const session_id = req.session.id;
                    req.session.save((err) => {
                        if(err) throw(err);
                        // res.render('main' , {id : session_id});
                        return res.redirect('/main').json({userdata});
                    })
                }
                else{
                    console.log('비번 틀림 , 로그인 실패');
                    res.redirect('/');
                }
                //if end 
            }//else end
            
        });//db조회 end 
        
});//router.post end
  
module.exports = router;