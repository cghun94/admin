require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const mysqlConnection ={
    cgh : function(){
        return mysql.createPool({
            host: process.env.CGHHOST ,
            port : process.env.CGHLOCALPOST,
            user: process.env.CGHUSER,
            password: process.env.CGHPASSWORD,
            database: process.env.CGHDATABASE
        }).promise()
    },   

    api : function(){
        return mysql.createPool({
            host: process.env.APIHOST ,
            port : process.env.APILOCALPOST,
            user: process.env.APIUSER,
            password: process.env.APIPASSWORD,
            database: process.env.APIDATABASE
        }).promise()
    },

}

module.exports = mysqlConnection;

