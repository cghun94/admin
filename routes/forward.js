require('dotenv').config();
const Parent = require('../module/parent');
let Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/"+process.env.API_KEY));
const myAddress = process.env.MYADDRESS;
const toAddress = process.env.TOADDRESS;
const privateKey = process.env.PRIVATEKEY;

// console.log(web3);
const axios = require("axios");
const cheerio = require("cheerio");

let url = 'http://3.1.145.143/';
const getData = async () => {
    try{
        return await axios.get(url)
    }catch(error){
        log(err)
    }
}


let wheresql = null;
let param = null;

module.exports = {
    txid :  (req, res , next) => {
        
        res.status(200)
        .render('forward/txid');                    
    },

    forwardPost : async(req, res, next) => {
        web3.eth.getBalance(myAddress, "latest", function(err, result) {
            console.log(result);
        });
        
    },



    parent : (req, res , next) => {
        res.status(200)
        .render('forward/parent');                    
    },

    parent2 : (req, res , next) => {
        res.status(200)
        .render('forward/parent2');                    
    },

    parentLatest : async(req, res , next) => {
        let data = await Parent.getLatest();
        
        res.status(200)
        .send(data);
    },

    parentList : async(req, res , next) => {
        let list =await Parent.getList();
        wheresql = 'where created_at > CURRENT_DATE()'
        param = null
        let count= await Parent.sqlCount(wheresql,param);
        count = count['count(idx)'];

        res.status(200)
        .render('forward/parent' , {
            list : list,
            count : count
        });
        
    },

    parentAdd : async(req, res , next) => {
        try{
            //(wheresql ,param)        
            wheresql = 'where salt = ?';
            param = req.body.salt;
            let data =await Parent.getRow(wheresql ,param );
            //salt 확인
            let dataCk;
            dataCk = dataCheck(data ,param);
            if(!dataCk){
                return res.status(403)
                .json({
                    code : 403,
                    message : "salt 존재",
                    result : false,
                });
            }
            //hash 확인
            wheresql = 'where hash = ?';
            param = req.body.hash;
            data = await Parent.getRow(wheresql ,param );
            dataCk = dataCheck(data ,param);
            if(!dataCk){
                return res.status(403)
                .json({
                    code : 403,
                    message : data.salt +" hash 존재",
                    result : false,
                });
            }
            //address 확인
            wheresql = 'where address = ?';
            param = req.body.address;
            data = await Parent.getRow(wheresql ,param );
            dataCk = dataCheck(data ,param);
            if(!dataCk){                
                res.status(403)
                .json({
                    code : 403,
                    message : data.salt + " address 존재",
                    result : false,
                });
                wheresql = 'select count(salt) from parent where address = ?'
                data = await Parent.sqlAll(wheresql,param);
                console.log('count = ',data['count(salt)']);
                return;
            }
            //데이터 베이스 추가
            wheresql = 'salt = ? , hash = ? , address = ?';
            param = [req.body.salt ,req.body.hash , req.body.address];
            console.log('추가 가능')
            Parent.addRow(wheresql ,param );
            return res.status(200).json({
                code : 200,
                message : "insert 성공",
                result : true,
            });
        }catch(e){
            console.log(e);
        }
    },

    
    
}
//data체크 함수
const dataCheck = (data , reqbody ) =>{
    if(data !== undefined){
        console.log( reqbody + ' 존재')
        return false
    }
    return true;
}
