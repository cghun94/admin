const express = require('express');
const router = express.Router();
const session = require('express-session');

/* GET home page. */
router.get('/',function(req,res){
    console.log(req.session.id);
    res.render('page/index');
});
router.get('/main',function(req,res){
    if(!req.session.id){
        res.redirect('/');
    }
    else{
        console.log(req.session.id);
    }
    res.render('page/main');
});

router.get('/logout',function(req,res){    
    if(!req.session.id){
        res.redirect('/');
    }
    else{
        console.log(req.session.id);
    }
    res.render('page/logout');
} );

module.exports = router;
