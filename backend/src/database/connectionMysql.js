const mysql = require('mysql');

const connection = mysql.createConnection({
  host:'mysql669.umbler.com',
  port:41890,
  user:'admin_hortafy',
  password:'1q2w3e4r',
  database : 'ws_hortafy'
  });

const query = (sql, callBack) => {
  return connection.query(sql, callBack);
  };

module.exports = {
    connection,
    query,
};