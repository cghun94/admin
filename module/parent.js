const Conn = require('./../config/database').api();

const test = async() => {
    console.log('test 1')
    let data = await Conn.query('select salt from parent order by salt desc limit 1')
    data0 = data[0]
    console.log(data0);
}
test();

let sql ,data;

module.exports = {
    /**
     * 
     * @param {String} where 'where email = ? and password = ?'
     * @param {Array} param 
     * @param {String} what 
     */
    getRow : async (wheresql ,param) => {
        if(wheresql && param){
            sql = `select * from parent ${wheresql} `;
            [data] = await Conn.query(sql, param );
        }
        else{
            [data] = await Conn.query(sql, param );
        }
        // console.log(data[0]);
        return data[0]
    },
    
    getLatest : async() =>{
        sql = 'select * from parent order by salt desc limit 1'
        // sql = 'select * from parent order by salt desc'
        data = await Conn.query(sql);        
        return data[0]
    },
    getList : async() =>{
        sql = 'select * from parent'
        // sql = 'select * from parent order by salt desc'
        data = await Conn.query(sql);        
        return data[0]
    },
    addRow : async(wheresql , param ) =>{
        sql = `insert into parent set ${wheresql} `;
        await Conn.query(sql, param);
        return
    },

    ModRow : function(){

    },
    delRow :function(){

    },
    sqlCount : async(wheresql , param) =>{
        sql = `select count(idx) from parent ${wheresql}`;
        data = await Conn.query(sql , param);
        return data[0][0]
    },
    sqlAll : async(sqlAll , param) =>{
        sql = `${sqlAll}`;
        data = await Conn.query(sql , param);
        return data[0][0]
    },
    
}