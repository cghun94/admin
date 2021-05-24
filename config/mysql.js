var mysql = require('mysql');


// var connection = mysql.createConnection({
//     host: 'localhost',
//     post: 3306,
//     user: 'einere',
//     password: 'mypassword',
//     database: 'HDVP'
// });
// connection.connect();

// connection.query('SELECT * from users', (error, rows, fields) => {
//     if (error) throw error;
//     console.log('config/mysql : ', rows);
//   });



// connection.end();
const mysqlConnection = {
    init: function () {
        return mysql.createConnection({
            host: 'localhost',
            post: 3306,
            user: 'einere',
            password: 'mypassword',
            database: 'HDVP'
        });
    },
    open: function (conn) {
        conn.connect(function (err) {
            if (err) {
                console.error('MySQL connection failed.'); 
                console.error('Error Code : ' + err.code); 
                console.error('Error Message : ' + err.message);
            }else {
                console.log('MySQL connection successful.');
            }
        });
    },
    close: function (conn) {
        conn.end(function (err) {
            if (err) {
                console.error('MySQL Terminate failed.'); 
                console.error('Error Code : ' + err.code); 
                console.error('Error Message : ' + err.message);
            }else{
                console.log("MySQL Terminate connection.");
            }
        });
    }
};

module.exports = mysqlConnection;