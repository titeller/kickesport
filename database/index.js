const mysql = require('mysql')

const production = {
  host: 'kickesport-db.crcchsi2oqby.ap-southeast-1.rds.amazonaws.com',
  user: 'kickesport',
  password: 'kickesportstrong',
  database: 'kickesport',
  timeout: 60000,
  port: 3306
}
const development = {
  host: '127.0.0.1',
  user: 'root',
  password: 'kickesportstrong',
  database: 'kickesport',
  timeout: 60000,
  port: 3306
}

const connection = mysql.createConnection(process.env.NODE_ENV === 'production' ? production : development);

exports.getConnection = function () {
    return connection;
}