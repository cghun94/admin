const router = require('express').Router();
const auth = require('../module/auth');
const main = require('./main');
const forward = require('./forward');

/* GET home page. */
router.get('/' , main.index);

router.get('/login',  auth.login);

router.get('/sign', auth.sign);

router.post('/login/post',  auth.reqbodyCheck,   auth.loginPost); 

//parent 데이터 베이스 접근
router.get('/parent', forward.parent);
router.get('/parent2', forward.parent2);

router.get('/parent/list',  forward.parentList);

router.post('/parent/list/latest',  forward.parentLatest);
router.post('/parent/add', auth.reqbodyCheck, forward.parentAdd);

//크롤링 시도
router.get('/txid', forward.txid);

router.post('/forward/post', forward.forwardPost);

module.exports = router;
