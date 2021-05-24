const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/',function(req,res){
    res.render('page/index');
});
router.get('/main',(req,res) => res.render('page/main') );

module.exports = router;
